from __future__ import annotations

from datetime import timedelta
from typing import Any

from django.conf import settings
from django.utils import timezone

from apps.integrations.models import Connector
from apps.monitoring.models import Monitor


class CollectorError(Exception):
    pass


def collect_for_monitor(monitor: Monitor) -> dict[str, Any]:
    if monitor.source_type == Monitor.SourceType.DEMO:
        return _collect_demo(monitor)
    if monitor.source_type == Monitor.SourceType.S3:
        return _collect_s3(monitor)
    if monitor.source_type == Monitor.SourceType.SNOWFLAKE:
        return _collect_snowflake(monitor)
    raise CollectorError(f"Unsupported source type: {monitor.source_type}")


def _collect_demo(monitor: Monitor) -> dict[str, Any]:
    """Deterministic local/demo collector for interactive demos and tests."""
    scenario = (monitor.connector_ref or {}).get("scenario", "healthy")
    now = timezone.now()

    if monitor.check_type == Monitor.CheckType.ARRIVAL:
        if scenario == "missing":
            return {"exists": False}
        if scenario == "stale":
            return {
                "exists": True,
                "last_modified": (now - timedelta(hours=6)).isoformat(),
            }
        return {
            "exists": True,
            "last_modified": (now - timedelta(minutes=10)).isoformat(),
        }

    if monitor.check_type == Monitor.CheckType.ROW_COUNT:
        if scenario == "low":
            return {"row_count": 0}
        if scenario == "high":
            return {"row_count": 10_000_000}
        return {"row_count": 1250}

    if monitor.check_type == Monitor.CheckType.FRESHNESS:
        if scenario == "stale":
            return {"watermark": (now - timedelta(hours=8)).isoformat()}
        return {"watermark": (now - timedelta(minutes=12)).isoformat()}

    raise CollectorError(f"Unsupported demo check type: {monitor.check_type}")


def _resolve_connector(monitor: Monitor) -> Connector | None:
    connector_id = (monitor.connector_ref or {}).get("connector_id")
    if not connector_id:
        return None
    return Connector.objects.filter(
        id=connector_id, workspace=monitor.workspace
    ).first()


def _collect_s3(monitor: Monitor) -> dict[str, Any]:
    import boto3
    from botocore.exceptions import ClientError

    connector = _resolve_connector(monitor)
    config = (connector.config if connector else {}) or {}
    ref = monitor.connector_ref or {}

    bucket = ref.get("bucket") or config.get("bucket")
    object_key = ref.get("object_key") or config.get("object_key")
    role_arn = config.get("role_arn")
    external_id = config.get("external_id")
    region = config.get("region", "us-east-1")

    if not bucket or not object_key:
        raise CollectorError("S3 collector requires bucket and object_key.")

    session_kwargs: dict[str, Any] = {"region_name": region}
    if role_arn:
        sts = boto3.client("sts", region_name=region)
        assume_kwargs = {
            "RoleArn": role_arn,
            "RoleSessionName": f"toravotech-{monitor.id}",
        }
        if external_id:
            assume_kwargs["ExternalId"] = external_id
        assumed = sts.assume_role(**assume_kwargs)
        creds = assumed["Credentials"]
        session_kwargs.update(
            {
                "aws_access_key_id": creds["AccessKeyId"],
                "aws_secret_access_key": creds["SecretAccessKey"],
                "aws_session_token": creds["SessionToken"],
            }
        )
    elif settings.AWS_ACCESS_KEY_ID:
        session_kwargs.update(
            {
                "aws_access_key_id": settings.AWS_ACCESS_KEY_ID,
                "aws_secret_access_key": settings.AWS_SECRET_ACCESS_KEY,
            }
        )

    client = boto3.client("s3", **session_kwargs)
    try:
        head = client.head_object(Bucket=bucket, Key=object_key)
    except ClientError as exc:
        code = exc.response.get("Error", {}).get("Code", "")
        if code in {"404", "NoSuchKey", "NotFound"}:
            return {"exists": False, "bucket": bucket, "object_key": object_key}
        raise CollectorError(f"S3 head_object failed: {exc}") from exc

    last_modified = head.get("LastModified")
    return {
        "exists": True,
        "bucket": bucket,
        "object_key": object_key,
        "last_modified": last_modified.isoformat() if last_modified else None,
        "content_length": head.get("ContentLength"),
    }


def _collect_snowflake(monitor: Monitor) -> dict[str, Any]:
    import snowflake.connector

    connector = _resolve_connector(monitor)
    config = (connector.config if connector else {}) or {}
    secrets = (connector.secret_ref if connector else {}) or {}
    ref = monitor.connector_ref or {}

    account = config.get("account")
    user = config.get("user") or secrets.get("user")
    password = secrets.get("password")
    warehouse = config.get("warehouse")
    database = config.get("database")
    schema = config.get("schema", "PUBLIC")
    table_name = ref.get("table_name") or config.get("table_name")
    watermark_column = ref.get("watermark_column") or config.get(
        "watermark_column", "UPDATED_AT"
    )

    if not all([account, user, password, warehouse, database, table_name]):
        raise CollectorError(
            "Snowflake collector requires account, user, password, "
            "warehouse, database, and table_name."
        )

    # Identifier pieces are constrained to simple SQL identifiers for safety.
    for part in (database, schema, table_name, watermark_column):
        if not str(part).replace("_", "").isalnum():
            raise CollectorError(f"Unsafe Snowflake identifier: {part}")

    conn = snowflake.connector.connect(
        account=account,
        user=user,
        password=password,
        warehouse=warehouse,
        database=database,
        schema=schema,
    )
    try:
        cur = conn.cursor()
        fq = f'"{database}"."{schema}"."{table_name}"'
        if monitor.check_type == Monitor.CheckType.ROW_COUNT:
            cur.execute(f"SELECT COUNT(*) FROM {fq}")
            row = cur.fetchone()
            return {"row_count": int(row[0]) if row else 0, "table": fq}
        if monitor.check_type == Monitor.CheckType.FRESHNESS:
            cur.execute(f'SELECT MAX("{watermark_column}") FROM {fq}')
            row = cur.fetchone()
            watermark = row[0] if row else None
            return {
                "watermark": watermark.isoformat() if watermark else None,
                "table": fq,
                "watermark_column": watermark_column,
            }
        if monitor.check_type == Monitor.CheckType.ARRIVAL:
            cur.execute(f'SELECT MAX("{watermark_column}") FROM {fq}')
            row = cur.fetchone()
            watermark = row[0] if row else None
            return {
                "exists": watermark is not None,
                "last_modified": watermark.isoformat() if watermark else None,
                "table": fq,
            }
        raise CollectorError(f"Unsupported Snowflake check: {monitor.check_type}")
    finally:
        conn.close()
