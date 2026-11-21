from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

from apps.monitoring.models import Incident, NotificationDelivery


def notify_incident_opened(incident: Incident) -> None:
    monitor = incident.monitor
    recipients = list(monitor.notify_emails or [])
    if not recipients:
        owner = (
            monitor.workspace.memberships.filter(role="owner")
            .select_related("user")
            .first()
        )
        if owner and owner.user.email:
            recipients = [owner.user.email]

    for recipient in recipients:
        delivery = NotificationDelivery.objects.create(
            incident=incident,
            recipient=recipient,
            status=NotificationDelivery.Status.QUEUED,
        )
        try:
            send_mail(
                subject=f"[ToravoTech] {incident.title}",
                message=(
                    f"{incident.summary}\n\n"
                    f"Monitor: {monitor.name}\n"
                    f"Workspace: {monitor.workspace.name}\n"
                    f"Opened: {incident.opened_at.isoformat()}\n"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=False,
            )
            delivery.status = NotificationDelivery.Status.SENT
            delivery.sent_at = timezone.now()
            delivery.provider_response = {"ok": True}
            delivery.save(
                update_fields=["status", "sent_at", "provider_response"]
            )
        except Exception as exc:  # noqa: BLE001
            delivery.status = NotificationDelivery.Status.FAILED
            delivery.provider_response = {"error": str(exc)}
            delivery.save(update_fields=["status", "provider_response"])
