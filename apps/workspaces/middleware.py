from django.utils.functional import SimpleLazyObject

from apps.workspaces.services import get_or_create_sandbox_workspace, user_workspaces


def _resolve_workspace(request):
    if not request.user.is_authenticated:
        return get_or_create_sandbox_workspace()

    workspaces = list(user_workspaces(request.user))
    if not workspaces:
        return get_or_create_sandbox_workspace()

    workspace_id = request.session.get("active_workspace_id")
    if workspace_id:
        for workspace in workspaces:
            if str(workspace.id) == str(workspace_id):
                return workspace
    workspace = workspaces[0]
    request.session["active_workspace_id"] = str(workspace.id)
    return workspace


class WorkspaceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.workspace = SimpleLazyObject(lambda: _resolve_workspace(request))
        return self.get_response(request)
