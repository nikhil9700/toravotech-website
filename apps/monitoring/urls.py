from django.urls import path

from apps.monitoring import views

app_name = "monitoring"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("monitors/", views.monitor_list, name="monitor_list"),
    path("monitors/new/", views.monitor_create, name="monitor_create"),
    path("monitors/<uuid:monitor_id>/", views.monitor_detail, name="monitor_detail"),
    path("monitors/<uuid:monitor_id>/edit/", views.monitor_edit, name="monitor_edit"),
    path(
        "monitors/<uuid:monitor_id>/activate/",
        views.monitor_activate,
        name="monitor_activate",
    ),
    path(
        "monitors/<uuid:monitor_id>/pause/",
        views.monitor_pause,
        name="monitor_pause",
    ),
    path(
        "monitors/<uuid:monitor_id>/run/",
        views.monitor_run_now,
        name="monitor_run_now",
    ),
    path(
        "incidents/<uuid:incident_id>/ack/",
        views.incident_ack,
        name="incident_ack",
    ),
]
