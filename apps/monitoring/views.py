from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from apps.monitoring.forms import MonitorForm
from apps.monitoring.models import Incident, Monitor
from apps.monitoring.services import run_monitor_check
from apps.workspaces.services import user_can_manage, user_can_view


def _require_workspace(request):
    workspace = request.workspace
    if not workspace:
        messages.error(request, "Workspace unavailable.")
        return None
    if not user_can_view(request.user, workspace):
        messages.error(request, "You do not have access to this workspace.")
        return None
    return workspace


def dashboard(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("home")

    monitors = workspace.monitors.all()
    open_qs = Incident.objects.filter(
        monitor__workspace=workspace,
        status=Incident.Status.OPEN,
    ).select_related("monitor")
    open_incidents = list(open_qs[:20])
    recent_runs = []
    for monitor in monitors:
        run = monitor.check_runs.first()
        if run:
            recent_runs.append(run)

    return render(
        request,
        "monitoring/dashboard.html",
        {
            "workspace": workspace,
            "monitors": monitors,
            "open_incidents": open_incidents,
            "open_incident_count": open_qs.count(),
            "recent_runs": sorted(
                recent_runs, key=lambda r: r.started_at, reverse=True
            )[:10],
            "can_manage": user_can_manage(request.user, workspace),
            "active_count": workspace.active_monitor_count,
        },
    )


def monitor_list(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("home")
    return render(
        request,
        "monitoring/monitor_list.html",
        {
            "workspace": workspace,
            "monitors": workspace.monitors.all(),
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


def monitor_create(request):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("home")
    if not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot create monitors here.")
        return redirect("monitoring:dashboard")

    initial = {}
    if request.method == "GET":
        check_type = request.GET.get("check_type")
        source_type = request.GET.get("source_type")
        if check_type in Monitor.CheckType.values:
            initial["check_type"] = check_type
        if source_type in Monitor.SourceType.values:
            initial["source_type"] = source_type

    form = MonitorForm(request.POST or None, initial=initial or None)
    if request.method == "POST" and form.is_valid():
        monitor = form.save(commit=False)
        monitor.workspace = workspace
        monitor.state = Monitor.State.DRAFT
        monitor.save()
        messages.success(request, "Monitor created as draft.")
        return redirect("monitoring:monitor_detail", monitor_id=monitor.id)

    return render(
        request,
        "monitoring/monitor_form.html",
        {"form": form, "workspace": workspace, "title": "New monitor"},
    )


def monitor_detail(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("home")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    return render(
        request,
        "monitoring/monitor_detail.html",
        {
            "workspace": workspace,
            "monitor": monitor,
            "runs": monitor.check_runs.all()[:25],
            "incidents": monitor.incidents.all()[:10],
            "can_manage": user_can_manage(request.user, workspace),
        },
    )


def monitor_edit(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace:
        return redirect("home")
    if not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot edit monitors here.")
        return redirect("monitoring:dashboard")

    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    form = MonitorForm(request.POST or None, instance=monitor)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Monitor updated.")
        return redirect("monitoring:monitor_detail", monitor_id=monitor.id)

    return render(
        request,
        "monitoring/monitor_form.html",
        {
            "form": form,
            "workspace": workspace,
            "monitor": monitor,
            "title": "Edit monitor",
        },
    )


@require_POST
def monitor_activate(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot activate monitors here.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    monitor.state = Monitor.State.ACTIVE
    monitor.save(update_fields=["state", "updated_at"])
    messages.success(request, f"{monitor.name} is now active.")
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@require_POST
def monitor_pause(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot pause monitors here.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    monitor.state = Monitor.State.PAUSED
    monitor.save(update_fields=["state", "updated_at"])
    messages.success(request, f"{monitor.name} paused.")
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@require_POST
def monitor_run_now(request, monitor_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot run checks here.")
        return redirect("monitoring:dashboard")
    monitor = get_object_or_404(Monitor, id=monitor_id, workspace=workspace)
    check_run = run_monitor_check(monitor)
    messages.info(request, f"Check finished: {check_run.status} — {check_run.message}")
    return redirect("monitoring:monitor_detail", monitor_id=monitor.id)


@require_POST
def incident_ack(request, incident_id):
    workspace = _require_workspace(request)
    if not workspace or not user_can_manage(request.user, workspace):
        messages.error(request, "You cannot acknowledge incidents here.")
        return redirect("monitoring:dashboard")
    incident = get_object_or_404(
        Incident, id=incident_id, monitor__workspace=workspace
    )
    incident.status = Incident.Status.ACKNOWLEDGED
    incident.save(update_fields=["status"])
    messages.success(request, "Incident acknowledged.")
    return redirect("monitoring:dashboard")
