from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST

from apps.demo.services_catalog import SERVICES, services_by_group
from apps.monitoring.evaluator import evaluate_monitor
from apps.monitoring.models import Monitor


SCENARIOS = {
    "arrival_healthy": {
        "label": "Arrival — on time",
        "check_type": Monitor.CheckType.ARRIVAL,
        "threshold": {"max_age_minutes": 60},
        "observed": {"exists": True, "last_modified": None},  # filled at runtime
        "story": "Nightly export landed in S3 within the expected window.",
    },
    "arrival_missing": {
        "label": "Arrival — missing",
        "check_type": Monitor.CheckType.ARRIVAL,
        "threshold": {"max_age_minutes": 60},
        "observed": {"exists": False},
        "story": "Expected file never showed up. Incident opens and email fires.",
    },
    "rows_low": {
        "label": "Row count — too low",
        "check_type": Monitor.CheckType.ROW_COUNT,
        "threshold": {"min_rows": 100, "max_rows": 50000},
        "observed": {"row_count": 12},
        "story": "Snowflake load finished but only 12 rows arrived.",
    },
    "freshness_stale": {
        "label": "Freshness — stale",
        "check_type": Monitor.CheckType.FRESHNESS,
        "threshold": {"max_age_minutes": 90},
        "observed": {"watermark": None},  # filled at runtime
        "story": "Watermark is 6 hours old — pipeline stalled upstream.",
    },
}


@require_GET
def home(request):
    return render(
        request,
        "demo/services.html",
        {
            "services": SERVICES,
            "service_groups": services_by_group(),
        },
    )


@require_GET
def landing(request):
    return render(request, "demo/demo.html", {"scenarios": SCENARIOS})


@require_POST
def run_scenario(request):
    from datetime import timedelta

    from django.utils import timezone

    key = request.POST.get("scenario", "arrival_healthy")
    scenario = SCENARIOS.get(key)
    if not scenario:
        return JsonResponse({"error": "Unknown scenario"}, status=400)

    observed = dict(scenario["observed"])
    now = timezone.now()
    if key == "arrival_healthy":
        observed["last_modified"] = (now - timedelta(minutes=8)).isoformat()
    if key == "freshness_stale":
        observed["watermark"] = (now - timedelta(hours=6)).isoformat()

    result = evaluate_monitor(scenario["check_type"], scenario["threshold"], observed)
    return JsonResponse(
        {
            "scenario": key,
            "label": scenario["label"],
            "story": scenario["story"],
            "status": result.status,
            "message": result.message,
            "observed": result.observed,
        }
    )
