from django.urls import path

from apps.integrations import collector_api

urlpatterns = [
    path("heartbeat/", collector_api.heartbeat, name="collector_heartbeat"),
    path("ingest/", collector_api.ingest, name="collector_ingest"),
]
