from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render

from apps.integrations.forms import ConnectorForm
from apps.integrations.models import Connector
from apps.workspaces.services import user_can_manage, user_can_view


def connector_list(request):
    workspace = request.workspace
    if not workspace or not user_can_view(request.user, workspace):
        return redirect("home")
    return render(
        request,
        "integrations/connector_list.html",
        {
            "workspace": workspace,
            "connectors": workspace.connectors.all(),
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


def connector_create(request):
    workspace = request.workspace
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot add connectors here.")
        return redirect("integrations:connector_list")

    initial = {}
    if request.method == "GET":
        kind = request.GET.get("kind")
        if kind in Connector.Kind.values:
            initial["kind"] = kind
            if kind == Connector.Kind.S3:
                initial["name"] = "S3 connection"
            elif kind == Connector.Kind.SNOWFLAKE:
                initial["name"] = "Snowflake connection"

    form = ConnectorForm(request.POST or None, initial=initial or None)
    if request.method == "POST" and form.is_valid():
        connector = form.save(commit=False)
        connector.workspace = workspace
        connector.save()
        messages.success(request, "Connector saved.")
        return redirect("integrations:connector_list")

    return render(
        request,
        "integrations/connector_form.html",
        {"form": form, "workspace": workspace, "title": "Add connector"},
    )


def connector_edit(request, connector_id):
    workspace = request.workspace
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot edit connectors here.")
        return redirect("integrations:connector_list")

    connector = get_object_or_404(Connector, id=connector_id, workspace=workspace)
    form = ConnectorForm(request.POST or None, instance=connector)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Connector updated.")
        return redirect("integrations:connector_list")

    return render(
        request,
        "integrations/connector_form.html",
        {
            "form": form,
            "workspace": workspace,
            "connector": connector,
            "title": "Edit connector",
        },
    )
