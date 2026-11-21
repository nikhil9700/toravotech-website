import logging
import time
from datetime import datetime

from croniter import croniter
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.monitoring.models import Monitor
from apps.monitoring.services import run_monitor_check

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Poll active monitors and run due checks."

    def add_arguments(self, parser):
        parser.add_argument(
            "--once",
            action="store_true",
            help="Run a single pass then exit.",
        )
        parser.add_argument(
            "--interval",
            type=int,
            default=30,
            help="Seconds between polling loops (default 30).",
        )

    def handle(self, *args, **options):
        once = options["once"]
        interval = options["interval"]
        self.stdout.write(self.style.SUCCESS("ToravoTech worker started."))
        while True:
            self._poll()
            if once:
                break
            time.sleep(interval)

    def _poll(self):
        now = timezone.now()
        monitors = Monitor.objects.filter(state=Monitor.State.ACTIVE)
        for monitor in monitors:
            if self._is_due(monitor, now):
                try:
                    check_run = run_monitor_check(monitor)
                    logger.info(
                        "Checked %s -> %s", monitor.name, check_run.status
                    )
                except Exception:  # noqa: BLE001
                    logger.exception("Failed check for %s", monitor.id)

    def _is_due(self, monitor: Monitor, now) -> bool:
        try:
            cron = croniter(monitor.schedule_cron, now)
        except (KeyError, ValueError):
            logger.warning(
                "Invalid cron for monitor %s: %s",
                monitor.id,
                monitor.schedule_cron,
            )
            return False
        prev = cron.get_prev(datetime)
        if timezone.is_naive(prev):
            prev = timezone.make_aware(prev, timezone.get_current_timezone())
        if monitor.last_checked_at is None:
            return True
        return monitor.last_checked_at < prev
