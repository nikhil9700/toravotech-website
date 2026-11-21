from django import forms

from apps.monitoring.models import Monitor


class MonitorForm(forms.ModelForm):
    notify_emails_text = forms.CharField(
        required=False,
        label="Notify emails",
        help_text="Comma-separated list.",
        widget=forms.TextInput(attrs={"placeholder": "ops@company.com"}),
    )
    max_age_minutes = forms.IntegerField(
        required=False, min_value=1, label="Max age (minutes)", initial=60
    )
    min_rows = forms.IntegerField(required=False, min_value=0, label="Min rows")
    max_rows = forms.IntegerField(required=False, min_value=0, label="Max rows")
    object_key = forms.CharField(
        required=False,
        label="Object key / path",
        help_text="For S3 arrival checks.",
    )
    table_name = forms.CharField(
        required=False,
        label="Table / view",
        help_text="For Snowflake checks.",
    )

    class Meta:
        model = Monitor
        fields = [
            "name",
            "source_type",
            "check_type",
            "schedule_cron",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            threshold = self.instance.threshold_json or {}
            connector = self.instance.connector_ref or {}
            self.fields["max_age_minutes"].initial = threshold.get("max_age_minutes", 60)
            self.fields["min_rows"].initial = threshold.get("min_rows")
            self.fields["max_rows"].initial = threshold.get("max_rows")
            self.fields["object_key"].initial = connector.get("object_key", "")
            self.fields["table_name"].initial = connector.get("table_name", "")
            emails = self.instance.notify_emails or []
            self.fields["notify_emails_text"].initial = ", ".join(emails)

    def clean(self):
        cleaned = super().clean()
        check_type = cleaned.get("check_type")
        source_type = cleaned.get("source_type")
        if check_type == Monitor.CheckType.ARRIVAL and not cleaned.get("object_key"):
            if source_type != Monitor.SourceType.DEMO:
                self.add_error("object_key", "Object key is required for arrival checks.")
        if check_type in (
            Monitor.CheckType.ROW_COUNT,
            Monitor.CheckType.FRESHNESS,
        ) and source_type == Monitor.SourceType.SNOWFLAKE:
            if not cleaned.get("table_name"):
                self.add_error("table_name", "Table name is required.")
        return cleaned

    def save(self, commit=True):
        monitor = super().save(commit=False)
        emails_raw = self.cleaned_data.get("notify_emails_text") or ""
        monitor.notify_emails = [
            part.strip() for part in emails_raw.split(",") if part.strip()
        ]
        threshold = {}
        if self.cleaned_data.get("max_age_minutes") is not None:
            threshold["max_age_minutes"] = self.cleaned_data["max_age_minutes"]
        if self.cleaned_data.get("min_rows") is not None:
            threshold["min_rows"] = self.cleaned_data["min_rows"]
        if self.cleaned_data.get("max_rows") is not None:
            threshold["max_rows"] = self.cleaned_data["max_rows"]
        monitor.threshold_json = threshold

        connector = dict(monitor.connector_ref or {})
        if self.cleaned_data.get("object_key"):
            connector["object_key"] = self.cleaned_data["object_key"]
        if self.cleaned_data.get("table_name"):
            connector["table_name"] = self.cleaned_data["table_name"]
        monitor.connector_ref = connector

        if commit:
            monitor.save()
        return monitor
