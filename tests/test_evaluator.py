from datetime import timedelta

from django.utils import timezone

from apps.monitoring.evaluator import evaluate_monitor


def test_arrival_pass():
    observed = {
        "exists": True,
        "last_modified": (timezone.now() - timedelta(minutes=5)).isoformat(),
    }
    result = evaluate_monitor("arrival", {"max_age_minutes": 60}, observed)
    assert result.status == "pass"


def test_arrival_missing():
    result = evaluate_monitor("arrival", {"max_age_minutes": 60}, {"exists": False})
    assert result.status == "fail"


def test_row_count_bounds():
    result = evaluate_monitor(
        "row_count", {"min_rows": 100, "max_rows": 1000}, {"row_count": 12}
    )
    assert result.status == "fail"


def test_freshness_stale():
    observed = {
        "watermark": (timezone.now() - timedelta(hours=5)).isoformat(),
    }
    result = evaluate_monitor("freshness", {"max_age_minutes": 60}, observed)
    assert result.status == "fail"
