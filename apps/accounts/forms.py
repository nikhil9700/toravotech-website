from allauth.account.forms import SignupForm
from django import forms


class ToravoSignupForm(SignupForm):
    full_name = forms.CharField(max_length=120, label="Full name", required=True)
    workspace_name = forms.CharField(
        max_length=120,
        label="Workspace name",
        required=True,
        help_text="Example: Acme Data Operations",
    )

    def save(self, request):
        user = super().save(request)
        full_name = self.cleaned_data["full_name"].strip()
        parts = full_name.split(" ", 1)
        user.first_name = parts[0]
        user.last_name = parts[1] if len(parts) > 1 else ""
        user.save(update_fields=["first_name", "last_name"])

        from apps.workspaces.services import create_workspace_for_owner

        create_workspace_for_owner(
            owner=user,
            name=self.cleaned_data["workspace_name"].strip(),
        )
        return user
