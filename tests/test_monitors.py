import pytest
from django.contrib.auth import get_user_model

from apps.monitoring.models import Monitor
from apps.monitoring.services import MonitorLimitExceeded, assert_can_activate, run_monitor_check
from apps.workspaces.services import create_workspace_for_owner

User = get_user_model()


@pytest.mark.django_db
def test_beta_monitor_limit(settings):
    settings.BETA_MONITOR_LIMIT = 3
    user = User.objects.create_user(username="a@example.com", email="a@example.com", password="x")
    workspace = create_workspace_for_owner(owner=user, name="Ops")
    monitors = []
    for i in range(3):
        m = Monitor.objects.create(
            workspace=workspace,
            name=f"M{i}",
            source_type=Monitor.SourceType.DEMO,
            check_type=Monitor.CheckType.ARRIVAL,
            state=Monitor.State.ACTIVE,
            connector_ref={"scenario": "healthy"},
            threshold_json={"max_age_minutes": 60},
        )
        monitors.append(m)

    extra = Monitor.objects.create(
        workspace=workspace,
        name="M3",
        source_type=Monitor.SourceType.DEMO,
        check_type=Monitor.CheckType.ARRIVAL,
        state=Monitor.State.DRAFT,
        connector_ref={"scenario": "healthy"},
        threshold_json={"max_age_minutes": 60},
    )
    with pytest.raises(MonitorLimitExceeded):
        assert_can_activate(extra)


@pytest.mark.django_db
def test_demo_check_creates_incident_on_fail():
    user = User.objects.create_user(username="b@example.com", email="b@example.com", password="x")
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
