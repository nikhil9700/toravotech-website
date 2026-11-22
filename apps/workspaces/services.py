from __future__ import annotations

from django.db import transaction
from django.utils.text import slugify

from apps.workspaces.models import Membership, Workspace

SANDBOX_SLUG = "open-sandbox"


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


def is_sandbox(workspace: Workspace | None) -> bool:
    return bool(workspace and workspace.slug == SANDBOX_SLUG)


def seed_sandbox_workspace(workspace: Workspace) -> None:
    from apps.integrations.models import Connector
    from apps.monitoring.models import Monitor

    if not workspace.connectors.exists():
        Connector.objects.create(
            workspace=workspace,
            name="Sample S3 bucket",
            kind=Connector.Kind.S3,
            status=Connector.Status.READY,
            config={
                "bucket": "example-feeds",
                "region": "us-east-1",
                "role_arn": "",
            },
        )
        Connector.objects.create(
            workspace=workspace,
            name="Sample Snowflake",
            kind=Connector.Kind.SNOWFLAKE,
            status=Connector.Status.READY,
            config={
                "account": "xy12345.us-east-1",
                "user": "readonly",
                "warehouse": "COMPUTE_WH",
                "database": "ANALYTICS",
                "schema": "PUBLIC",
            },
        )

    if workspace.monitors.exists():
        return

    samples = [
        {
            "name": "Nightly orders parquet",
            "check_type": Monitor.CheckType.ARRIVAL,
            "scenario": "healthy",
            "threshold": {"max_age_minutes": 60},
        },
        {
            "name": "Sales fact freshness",
            "check_type": Monitor.CheckType.FRESHNESS,
            "scenario": "stale",
            "threshold": {"max_age_minutes": 90},
        },
        {
            "name": "Inventory row count",
            "check_type": Monitor.CheckType.ROW_COUNT,
            "scenario": "healthy",
            "threshold": {"min_rows": 100, "max_rows": 50000},
        },
    ]
    for sample in samples:
        Monitor.objects.create(
            workspace=workspace,
            name=sample["name"],
            source_type=Monitor.SourceType.DEMO,
            check_type=sample["check_type"],
            state=Monitor.State.ACTIVE,
            connector_ref={"scenario": sample["scenario"]},
            threshold_json=sample["threshold"],
            notify_emails=[],
        )


def get_or_create_sandbox_workspace() -> Workspace:
    workspace, _created = Workspace.objects.get_or_create(
        slug=SANDBOX_SLUG,
        defaults={"name": "Open workspace"},
    )
    seed_sandbox_workspace(workspace)
    return workspace


def user_workspaces(user):
    if not getattr(user, "is_authenticated", False):
        return Workspace.objects.none()
    return Workspace.objects.filter(memberships__user=user).distinct()


def user_can_manage(user, workspace: Workspace) -> bool:
    if is_sandbox(workspace):
        return True
    if not getattr(user, "is_authenticated", False):
        return False
    return Membership.objects.filter(
        workspace=workspace,
        user=user,
        role=Membership.Role.OWNER,
    ).exists()


def user_can_view(user, workspace: Workspace) -> bool:
    if is_sandbox(workspace):
        return True
    if not getattr(user, "is_authenticated", False):
        return False
    return Membership.objects.filter(workspace=workspace, user=user).exists()
