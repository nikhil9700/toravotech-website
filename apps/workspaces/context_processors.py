from django.conf import settings

from apps.workspaces.services import user_workspaces


def site_branding(request):
    workspaces = []
    if getattr(request, "user", None) and request.user.is_authenticated:
        workspaces = list(user_workspaces(request.user))
    return {
        "SITE_NAME": settings.SITE_NAME,
        "SITE_URL": settings.SITE_URL,
        "SUPPORT_EMAIL": settings.SUPPORT_EMAIL,
        "user_workspaces": workspaces,
        "active_workspace": getattr(request, "workspace", None),
    }
