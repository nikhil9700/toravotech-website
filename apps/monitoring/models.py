import uuid

from django.db import models
from django.utils import timezone

from apps.workspaces.models import Workspace


class Monitor(models.Model):
    class State(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        PAUSED = "paused", "Paused"
        ARCHIVED = "archived", "Archived"

    class SourceType(models.TextChoices):
        S3 = "s3", "Amazon S3"
        SNOWFLAKE = "snowflake", "Snowflake"
        DEMO = "demo", "Demo"

    class CheckType(models.TextChoices):
        ARRIVAL = "arrival", "Arrival"
        ROW_COUNT = "row_count", "Row count"
        FRESHNESS = "freshness", "Freshness"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="monitors"
    )
    name = models.CharField(max_length=160)
    source_type = models.CharField(max_length=20, choices=SourceType.choices)
    check_type = models.CharField(max_length=20, choices=CheckType.choices)
    state = models.CharField(
        max_length=20, choices=State.choices, default=State.DRAFT
    )
    schedule_cron = models.CharField(max_length=64, default="*/15 * * * *")
    expected_by_cron = models.CharField(
        max_length=64,
        blank=True,
        help_text="Optional expected arrival window expression.",
    )
    threshold_json = models.JSONField(default=dict, blank=True)
    connector_ref = models.JSONField(default=dict, blank=True)
    notify_emails = models.JSONField(default=list, blank=True)
    last_checked_at = models.DateTimeField(null=True, blank=True)
    last_status = models.CharField(max_length=20, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.workspace})"


class CheckRun(models.Model):
    class Status(models.TextChoices):
        PASS = "pass", "Pass"
        FAIL = "fail", "Fail"
        ERROR = "error", "Error"
        SKIPPED = "skipped", "Skipped"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monitor = models.ForeignKey(
        Monitor, on_delete=models.CASCADE, related_name="check_runs"
    )
    status = models.CharField(max_length=20, choices=Status.choices)
    started_at = models.DateTimeField(default=timezone.now)
    finished_at = models.DateTimeField(null=True, blank=True)
    observed_value = models.JSONField(default=dict, blank=True)
    message = models.TextField(blank=True, default="")
    raw_result = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self) -> str:
        return f"{self.monitor.name}: {self.status}"


class Incident(models.Model):
    class Status(models.TextChoices):
        OPEN = "open", "Open"
        ACKNOWLEDGED = "acknowledged", "Acknowledged"
        RESOLVED = "resolved", "Resolved"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monitor = models.ForeignKey(
        Monitor, on_delete=models.CASCADE, related_name="incidents"
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.OPEN
    )
    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True, default="")
    opened_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    last_check_run = models.ForeignKey(
        CheckRun,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="incidents",
    )

    class Meta:
        ordering = ["-opened_at"]

    def __str__(self) -> str:
        return self.title


class NotificationDelivery(models.Model):
    class Channel(models.TextChoices):
        EMAIL = "email", "Email"

    class Status(models.TextChoices):
        QUEUED = "queued", "Queued"
        SENT = "sent", "Sent"
        FAILED = "failed", "Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    incident = models.ForeignKey(
        Incident, on_delete=models.CASCADE, related_name="deliveries"
    )
    channel = models.CharField(
        max_length=20, choices=Channel.choices, default=Channel.EMAIL
    )
    recipient = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.QUEUED
    )
    provider_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
