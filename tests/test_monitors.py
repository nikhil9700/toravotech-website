import pytest
from django.contrib.auth import get_user_model

from apps.monitoring.models import Monitor
from apps.monitoring.services import run_monitor_check
from apps.workspaces.services import create_workspace_for_owner

User = get_user_model()


@pytest.mark.django_db
def test_unlimited_activate():
    user = User.objects.create_user(
        username="a@example.com", email="a@example.com", password="x"
    )
    workspace = create_workspace_for_owner(owner=user, name="Ops")
    for i in range(5):
        monitor = Monitor.objects.create(
            workspace=workspace,
            name=f"M{i}",
            source_type=Monitor.SourceType.DEMO,
            check_type=Monitor.CheckType.ARRIVAL,
            state=Monitor.State.DRAFT,
            connector_ref={"scenario": "healthy"},
            threshold_json={"max_age_minutes": 60},
        )
        monitor.state = Monitor.State.ACTIVE
        monitor.save(update_fields=["state"])
    assert workspace.monitors.filter(state=Monitor.State.ACTIVE).count() == 5


@pytest.mark.django_db
def test_sample_check_creates_incident_on_fail():
    user = User.objects.create_user(
        username="b@example.com", email="b@example.com", password="x"
    )
    workspace = create_workspace_for_owner(owner=user, name="Ops")
    monitor = Monitor.objects.create(
        workspace=workspace,
        name="Missing feed",
        source_type=Monitor.SourceType.DEMO,
        check_type=Monitor.CheckType.ARRIVAL,
        state=Monitor.State.ACTIVE,
        connector_ref={"scenario": "missing"},
        threshold_json={"max_age_minutes": 60},
        notify_emails=["ops@example.com"],
    )
    run = run_monitor_check(monitor)
    assert run.status == "fail"
    assert monitor.incidents.filter(status="open").exists()
