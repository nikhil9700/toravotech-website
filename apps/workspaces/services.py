from django.db import transaction
from django.utils.text import slugify

from apps.workspaces.models import Membership, Workspace


def unique_slug(name: str) -> str:
    base = slugify(name) or "workspace"
    slug = base
    index = 2
    while Workspace.objects.filter(slug=slug).exists():
        slug = f"{base}-{index}"
        index += 1
    return slug


@transaction.atomic
def create_workspace_for_owner(*, owner, name: str) -> Workspace:
    workspace = Workspace.objects.create(name=name, slug=unique_slug(name))
    Membership.objects.create(
        workspace=workspace,
        user=owner,
        role=Membership.Role.OWNER,
    )
    return workspace


def user_workspaces(user):
    return Workspace.objects.filter(memberships__user=user).distinct()


def user_can_manage(user, workspace: Workspace) -> bool:
    return Membership.objects.filter(
        workspace=workspace,
        user=user,
        role=Membership.Role.OWNER,
    ).exists()


def user_can_view(user, workspace: Workspace) -> bool:
    return Membership.objects.filter(workspace=workspace, user=user).exists()
