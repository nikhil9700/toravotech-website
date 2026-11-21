from django.contrib import admin

from apps.analytics.models import PageView


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("path", "created_at", "referrer")
    search_fields = ("path", "referrer")
