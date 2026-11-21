from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from apps.monitoring.forms import MonitorForm
from apps.monitoring.models import Incident, Monitor
from apps.monitoring.services import MonitorLimitExceeded, assert_can_activate, run_monitor_check
from apps.workspaces.services import user_can_manage, user_can_view


def _require_workspace(request):
    workspace = request.workspace
    if not workspace:
        messages.error(request, "Create or join a workspace first.")
        return None
    if not user_can_view(request.user, workspace):
        messages.error(request, "You do not have access to this workspace.")
        return None
    return workspace


@login_required
def dashboard(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("account_login")

    monitors = workspace.monitors.all()
    open_incidents = Incident.objects.filter(
        monitor__workspace=workspace,
        status=Incident.Status.OPEN,
    ).select_related("monitor")[:20]
    recent_runs = []
    for monitor in monitors:
        run = monitor.check_runs.first()
        if run:
            recent_runs.append(run)

    return render(
        request,
        "monitoring/dashboard.html",
        {
            "workspace": workspace,
            "monitors": monitors,
            "open_incidents": open_incidents,
            "recent_runs": sorted(
                recent_runs, key=lambda r: r.started_at, reverse=True
            )[:10],
            "can_manage": user_can_manage(request.user, workspace),
            "monitor_limit": workspace.monitor_limit,
            "active_count": workspace.active_monitor_count,
        },
    )


@login_required
def monitor_list(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("account_login")
    return render(
        request,
        "monitoring/monitor_list.html",
        {
            "workspace": workspace,
            "monitors": workspace.monitors.all(),
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


@login_required
def monitor_create(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("account_login")
    if not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can create monitors.")
        return redirect("monitoring:dashboard")

    form = MonitorForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        monitor = form.save(commit=False)
        monitor.workspace = workspace
        monitor.state = Monitor.State.DRAFT
        monitor.save()
        messages.success(request, "Monitor created as draft.")
        return redirect("monitoring:monitor_detail", monitor_id=monitor.id)

    return render(
        request,
        "monitoring/monitor_form.html",
        {"form": form, "workspace": workspace, "title": "New monitor"},
    )


@login_required
def monitor_detail(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("account_login")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    return render(
        request,
        "monitoring/monitor_detail.html",
        {
            "workspace": workspace,
            "monitor": monitor,
            "runs": monitor.check_runs.all()[:25],
            "incidents": monitor.incidents.all()[:10],
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


@login_required
def monitor_edit(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("account_login")
    if not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can edit monitors.")
        return redirect("monitoring:dashboard")

    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    form = MonitorForm(request.POST or None, instance=monitor)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Monitor updated.")
        return redirect("monitoring:monitor_detail", monitor_id=monitor.id)

    return render(
        request,
        "monitoring/monitor_form.html",
        {
            "form": form,
            "workspace": workspace,
            "monitor": monitor,
            "title": "Edit monitor",
        },
    )


@login_required
@require_POST
def monitor_activate(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can activate monitors.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    try:
        assert_can_activate(monitor)
        monitor.state = Monitor.State.ACTIVE
        monitor.save(update_fields=["state", "updated_at"])
        messages.success(request, f"{monitor.name} is now active.")
    except MonitorLimitExceeded as exc:
        messages.error(request, str(exc))
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@login_required
@require_POST
def monitor_pause(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can pause monitors.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    monitor.state = Monitor.State.PAUSED
    monitor.save(update_fields=["state", "updated_at"])
    messages.success(request, f"{monitor.name} paused.")
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@login_required
@require_POST
def monitor_run_now(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can run checks.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    check_run = run_monitor_check(monitor)
    messages.info(request, f"Check finished: {check_run.status} — {check_run.message}")
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@login_required
@require_POST
def incident_ack(request, incident_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "Only owners can acknowledge incidents.")
        return redirect("monitoring:dashboard")
    incident = get_object_or_404(
        Incident, id=incident_id, monitor__workspace=workspace
    )
    incident.status = Incident.Status.ACKNOWLEDGED
    incident.save(update_fields=["status"])
    messages.success(request, "Incident acknowledged.")
    return redirect("monitoring:dashboard")
