import uuid

from django.db import models

from apps.workspaces.models import Workspace


class Connector(models.Model):
    class Kind(models.TextChoices):
        S3 = "s3", "Amazon S3"
        SNOWFLAKE = "snowflake", "Snowflake"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        READY = "ready", "Ready"
        ERROR = "error", "Error"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="connectors"
    )
    name = models.CharField(max_length=120)
    kind = models.CharField(max_length=20, choices=Kind.choices)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.DRAFT
    )
    # Non-secret configuration (bucket, role ARN, account, warehouse, etc.)
    config = models.JSONField(default=dict, blank=True)
    # Encrypted-at-rest secrets in a later phase; store opaque refs for now.
    secret_ref = models.JSONField(default=dict, blank=True)
    last_validated_at = models.DateTimeField(null=True, blank=True)
    last_error = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.kind})"
