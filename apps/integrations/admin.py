from django.contrib import admin

from apps.integrations.models import Connector


@admin.register(Connector)
class ConnectorAdmin(admin.ModelAdmin):
    list_display = ("name", "workspace", "kind", "status", "updated_at")
    list_filter = ("kind", "status")
    search_fields = ("name", "workspace__name")
