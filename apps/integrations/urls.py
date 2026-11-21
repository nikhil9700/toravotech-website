from django.urls import path

from apps.integrations import views

app_name = "integrations"

urlpatterns = [
    path("", views.connector_list, name="connector_list"),
    path("new/", views.connector_create, name="connector_create"),
    path("<uuid:connector_id>/edit/", views.connector_edit, name="connector_edit"),
]
