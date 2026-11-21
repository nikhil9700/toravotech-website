from django.urls import path

from apps.workspaces import views

app_name = "workspaces"

urlpatterns = [
    path("settings/", views.workspace_settings, name="settings"),
    path("invite/", views.invite_member, name="invite"),
    path("switch/<uuid:workspace_id>/", views.switch_workspace, name="switch"),
    path(
        "invitations/<str:token>/accept/",
        views.accept_invitation,
        name="accept_invitation",
    ),
]
