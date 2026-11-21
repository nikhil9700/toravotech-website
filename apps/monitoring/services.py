from __future__ import annotations

from django.conf import settings
from django.db import transaction
from django.utils import timezone

from apps.integrations.collector import collect_for_monitor
from apps.monitoring.evaluator import evaluate_monitor
from apps.monitoring.models import CheckRun, Incident, Monitor
from apps.monitoring.notifications import notify_incident_opened


class MonitorLimitExceeded(Exception):
    pass


def assert_can_activate(monitor: Monitor) -> None:
    workspace = monitor.workspace
    active = workspace.monitors.filter(state=Monitor.State.ACTIVE).exclude(
        pk=monitor.pk
    )
    if active.count() >= settings.BETA_MONITOR_LIMIT:
        raise MonitorLimitExceeded(
            f"Beta limit is {settings.BETA_MONITOR_LIMIT} active monitors per workspace."
        )


@transaction.atomic
def run_monitor_check(monitor: Monitor) -> CheckRun:
    started = timezone.now()
    try:
        observed = collect_for_monitor(monitor)
        result = evaluate_monitor(
            monitor.check_type,
            monitor.threshold_json or {},
            observed,
        )
        status = result.status
        message = result.message
        observed_value = result.observed
        raw = {"collector": observed, "evaluation": result.message}
    except Exception as exc:  # noqa: BLE001 - worker must record errors
        status = CheckRun.Status.ERROR
        message = str(exc)
        observed_value = {}
        raw = {"error": str(exc)}

    check_run = CheckRun.objects.create(
        monitor=monitor,
        status=status,
        started_at=started,
        finished_at=timezone.now(),
        observed_value=observed_value,
        message=message,
        raw_result=raw,
    )
    monitor.last_checked_at = check_run.finished_at
    monitor.last_status = status
    monitor.save(update_fields=["last_checked_at", "last_status", "updated_at"])

    if status == CheckRun.Status.FAIL:
        _open_or_refresh_incident(monitor, check_run, message)
    elif status == CheckRun.Status.PASS:
        _resolve_open_incidents(monitor, check_run)

    return check_run


def _open_or_refresh_incident(monitor: Monitor, check_run: CheckRun, message: str) -> None:
    incident = (
        monitor.incidents.filter(status=Incident.Status.OPEN)
        .order_by("-opened_at")
        .first()
    )
    if incident:
        incident.summary = message
        incident.last_check_run = check_run
        incident.save(update_fields=["summary", "last_check_run"])
        return

    incident = Incident.objects.create(
        monitor=monitor,
        title=f"{monitor.name} failed",
        summary=message,
        last_check_run=check_run,
    )
    notify_incident_opened(incident)


def _resolve_open_incidents(monitor: Monitor, check_run: CheckRun) -> None:
    open_incidents = monitor.incidents.filter(
        status__in=[Incident.Status.OPEN, Incident.Status.ACKNOWLEDGED]
    )
    now = timezone.now()
    for incident in open_incidents:
        incident.status = Incident.Status.RESOLVED
        incident.resolved_at = now
        incident.last_check_run = check_run
        incident.save(update_fields=["status", "resolved_at", "last_check_run"])
