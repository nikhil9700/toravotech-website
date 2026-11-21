from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone as dt_timezone
from typing import Any

from django.utils import timezone
from django.utils.dateparse import parse_datetime


@dataclass
class EvaluationResult:
    status: str
    message: str
    observed: dict[str, Any]


def _parse_ts(value: Any) -> datetime | None:
    if value is None:
        return None
    if isinstance(value, datetime):
        if timezone.is_naive(value):
            return timezone.make_aware(value, dt_timezone.utc)
        return value
    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(value, tz=dt_timezone.utc)
    if isinstance(value, str):
        parsed = parse_datetime(value)
        if parsed is None:
            return None
        if timezone.is_naive(parsed):
            return timezone.make_aware(parsed, dt_timezone.utc)
        return parsed
    return None


def evaluate_arrival(threshold: dict, observed: dict) -> EvaluationResult:
    """
    Pass when an object/file arrived after expected_not_before and before grace.
    Observed expects: last_modified (ISO) and optionally exists (bool).
    Threshold expects: max_age_minutes (int).
    """
    exists = observed.get("exists", True)
    if not exists:
        return EvaluationResult(
            status="fail",
            message="Expected object was not found.",
            observed=observed,
        )

    last_modified = _parse_ts(observed.get("last_modified"))
    max_age = int(threshold.get("max_age_minutes", 60))
    if last_modified is None:
        return EvaluationResult(
            status="error",
            message="Collector did not return a last_modified timestamp.",
            observed=observed,
        )

    age_minutes = (timezone.now() - last_modified).total_seconds() / 60.0
    observed = {**observed, "age_minutes": round(age_minutes, 2)}
    if age_minutes <= max_age:
        return EvaluationResult(
            status="pass",
            message=f"Object is fresh ({age_minutes:.1f}m old, limit {max_age}m).",
            observed=observed,
        )
    return EvaluationResult(
        status="fail",
        message=f"Object is stale ({age_minutes:.1f}m old, limit {max_age}m).",
        observed=observed,
    )


def evaluate_row_count(threshold: dict, observed: dict) -> EvaluationResult:
    """
    Pass when row_count is within min/max bounds.
    """
    if "row_count" not in observed:
        return EvaluationResult(
            status="error",
            message="Collector did not return row_count.",
            observed=observed,
        )
    count = int(observed["row_count"])
    minimum = threshold.get("min_rows")
    maximum = threshold.get("max_rows")
    if minimum is not None and count < int(minimum):
        return EvaluationResult(
            status="fail",
            message=f"Row count {count} is below minimum {minimum}.",
            observed=observed,
        )
    if maximum is not None and count > int(maximum):
        return EvaluationResult(
            status="fail",
            message=f"Row count {count} is above maximum {maximum}.",
            observed=observed,
        )
    return EvaluationResult(
        status="pass",
        message=f"Row count {count} is within bounds.",
        observed=observed,
    )


def evaluate_freshness(threshold: dict, observed: dict) -> EvaluationResult:
    """
    Pass when newest watermark is within max_age_minutes.
    Observed expects: watermark (ISO datetime).
    """
    watermark = _parse_ts(observed.get("watermark"))
    max_age = int(threshold.get("max_age_minutes", 60))
    if watermark is None:
        return EvaluationResult(
            status="error",
            message="Collector did not return a watermark.",
            observed=observed,
        )
    age_minutes = (timezone.now() - watermark).total_seconds() / 60.0
    observed = {**observed, "age_minutes": round(age_minutes, 2)}
    if age_minutes <= max_age:
        return EvaluationResult(
            status="pass",
            message=f"Watermark is fresh ({age_minutes:.1f}m old).",
            observed=observed,
        )
    return EvaluationResult(
        status="fail",
        message=f"Watermark is stale ({age_minutes:.1f}m old, limit {max_age}m).",
        observed=observed,
    )


EVALUATORS = {
    "arrival": evaluate_arrival,
    "row_count": evaluate_row_count,
    "freshness": evaluate_freshness,
}


def evaluate_monitor(check_type: str, threshold: dict, observed: dict) -> EvaluationResult:
    evaluator = EVALUATORS.get(check_type)
    if evaluator is None:
        return EvaluationResult(
            status="error",
            message=f"Unknown check type: {check_type}",
            observed=observed,
        )
    return evaluator(threshold or {}, observed or {})
