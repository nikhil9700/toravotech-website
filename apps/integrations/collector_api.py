"""HMAC-authenticated collector ingest endpoints (phase-1 stub)."""

from __future__ import annotations

import hashlib
import hmac
import json
import time

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST


def _verify_hmac(request) -> tuple[bool, str]:
    key = (settings.FIELD_ENCRYPTION_KEY or "").encode()
    if not key:
        # Local/dev: allow unauthenticated when no key configured.
        if settings.DEBUG:
            return True, ""
        return False, "Collector key not configured"

    timestamp = request.headers.get("X-Toravo-Timestamp", "")
    signature = request.headers.get("X-Toravo-Signature", "")
    if not timestamp or not signature:
        return False, "Missing HMAC headers"

    try:
        ts = int(timestamp)
    except ValueError:
        return False, "Invalid timestamp"

    skew = abs(int(time.time()) - ts)
    if skew > settings.COLLECTOR_HMAC_MAX_SKEW_SECONDS:
        return False, "Timestamp skew too large"

    body = request.body or b""
    payload = timestamp.encode() + b"." + body
    expected = hmac.new(key, payload, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        return False, "Invalid signature"
    return True, ""


@require_GET
def heartbeat(request):
    return JsonResponse({"ok": True, "service": "toravotech-collector"})


@csrf_exempt
@require_POST
def ingest(request):
    ok, err = _verify_hmac(request)
    if not ok:
        return JsonResponse({"ok": False, "error": err}, status=401)

    try:
        payload = json.loads(request.body.decode() or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"ok": False, "error": "Invalid JSON"}, status=400)

    # Phase 1: acknowledge payload shape; wired to CheckRun creation next.
    return JsonResponse(
        {
            "ok": True,
            "accepted": True,
            "monitor_id": payload.get("monitor_id"),
            "keys": sorted(payload.keys()),
        }
    )
