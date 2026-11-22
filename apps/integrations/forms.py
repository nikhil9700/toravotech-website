from django import forms

from apps.integrations.models import Connector


class ConnectorForm(forms.ModelForm):
    class Meta:
        model = Connector
        fields = ["name", "kind"]

    bucket = forms.CharField(required=False, label="S3 bucket")
    role_arn = forms.CharField(required=False, label="IAM role ARN")
    external_id = forms.CharField(required=False, label="External ID")
    region = forms.CharField(required=False, initial="us-east-1", label="AWS region")

    account = forms.CharField(required=False, label="Snowflake account")
    user = forms.CharField(required=False, label="Snowflake user")
    password = forms.CharField(
        required=False, widget=forms.PasswordInput, label="Snowflake password"
    )
    warehouse = forms.CharField(required=False, label="Warehouse")
    database = forms.CharField(required=False, label="Database")
    schema_name = forms.CharField(required=False, initial="PUBLIC", label="Schema")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            css = field.widget.attrs.get("class", "")
            field.widget.attrs["class"] = f"{css} field-control".strip()
        config = (self.instance.config if self.instance and self.instance.pk else {}) or {}
        for field in (
            "bucket",
            "role_arn",
            "external_id",
            "region",
            "account",
            "user",
            "warehouse",
            "database",
        ):
            if field in self.fields:
                self.fields[field].initial = config.get(field, self.fields[field].initial)
        self.fields["schema_name"].initial = config.get("schema", "PUBLIC")

    def save(self, commit=True):
        connector = super().save(commit=False)
        kind = self.cleaned_data["kind"]
        config = dict(connector.config or {})
        secrets = dict(connector.secret_ref or {})

        if kind == Connector.Kind.S3:
            config.update(
                {
                    "bucket": self.cleaned_data.get("bucket") or "",
                    "role_arn": self.cleaned_data.get("role_arn") or "",
                    "external_id": self.cleaned_data.get("external_id") or "",
                    "region": self.cleaned_data.get("region") or "us-east-1",
                }
            )
        elif kind == Connector.Kind.SNOWFLAKE:
            config.update(
                {
                    "account": self.cleaned_data.get("account") or "",
                    "user": self.cleaned_data.get("user") or "",
                    "warehouse": self.cleaned_data.get("warehouse") or "",
                    "database": self.cleaned_data.get("database") or "",
                    "schema": self.cleaned_data.get("schema_name") or "PUBLIC",
                }
            )
            password = self.cleaned_data.get("password")
            if password:
                secrets["password"] = password
                secrets["user"] = self.cleaned_data.get("user") or ""

        connector.config = config
        connector.secret_ref = secrets
        connector.status = Connector.Status.READY
        if commit:
            connector.save()
        return connector
