from django.contrib import admin

from apps.monitoring.models import (
    CheckRun,
    Incident,
    Monitor,
    NotificationDelivery,
)


@admin.register(Monitor)
class MonitorAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "workspace",
        "source_type",
        "check_type",
        "state",
        "last_status",
        "last_checked_at",
    )
    list_filter = ("state", "source_type", "check_type")
    search_fields = ("name", "workspace__name")


@admin.register(CheckRun)
class CheckRunAdmin(admin.ModelAdmin):
    list_display = ("monitor", "status", "started_at", "finished_at")
    list_filter = ("status",)


@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ("title", "monitor", "status", "opened_at", "resolved_at")
    list_filter = ("status",)


@admin.register(NotificationDelivery)
class NotificationDeliveryAdmin(admin.ModelAdmin):
    list_display = ("incident", "recipient", "channel", "status", "created_at")
    list_filter = ("status", "channel")
