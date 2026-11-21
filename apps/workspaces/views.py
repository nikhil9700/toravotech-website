from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_POST

from apps.workspaces.models import Invitation, Membership
from apps.workspaces.services import user_can_manage, user_workspaces


@login_required
def switch_workspace(request, workspace_id):
    workspace = get_object_or_404(
        user_workspaces(request.user),
        id=workspace_id,
    )
    request.session["active_workspace_id"] = str(workspace.id)
    messages.success(request, f"Switched to {workspace.name}.")
    return redirect("monitoring:dashboard")


@login_required
def invite_member(request):
    workspace = request.workspace
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can invite members.")
        return redirect("monitoring:dashboard")

    if request.method == "POST":
        email = request.POST.get("email", "").strip().lower()
        role = request.POST.get("role", Membership.Role.VIEWER)
        if role not in Membership.Role.values:
            role = Membership.Role.VIEWER
        if email:
            Invitation.objects.create(
                workspace=workspace,
                email=email,
                role=role,
                invited_by=request.user,
            )
            messages.success(request, f"Invitation created for {email}.")
            return redirect("workspaces:settings")
        messages.error(request, "Enter a valid email.")

    return render(
        request,
        "workspaces/settings.html",
        {
            "workspace": workspace,
            "memberships": workspace.memberships.select_related("user"),
            "invitations": workspace.invitations.filter(
                status=Invitation.Status.PENDING
            ),
        },
    )


@login_required
def workspace_settings(request):
    workspace = request.workspace
    if not workspace:
        return redirect("account_login")
    return render(
        request,
        "workspaces/settings.html",
        {
            "workspace": workspace,
            "memberships": workspace.memberships.select_related("user"),
            "invitations": workspace.invitations.filter(
                status=Invitation.Status.PENDING
            ),
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


@login_required
@require_POST
def accept_invitation(request, token):
    invitation = get_object_or_404(Invitation, token=token)
    if not invitation.is_usable:
        messages.error(request, "This invitation is no longer valid.")
        return redirect("monitoring:dashboard")
    if request.user.email.lower() != invitation.email.lower():
        messages.error(request, "Sign in with the invited email address.")
        return redirect("monitoring:dashboard")

    Membership.objects.get_or_create(
        workspace=invitation.workspace,
        user=request.user,
        defaults={"role": invitation.role},
    )
    invitation.status = Invitation.Status.ACCEPTED
    invitation.accepted_at = timezone.now()
    invitation.save(update_fields=["status", "accepted_at"])
    request.session["active_workspace_id"] = str(invitation.workspace_id)
    messages.success(request, f"Joined {invitation.workspace.name}.")
    return redirect("monitoring:dashboard")
