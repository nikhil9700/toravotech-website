from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class AccountAdapter(DefaultAccountAdapter):
    def get_from_email(self):
        return settings.DEFAULT_FROM_EMAIL

    def is_open_for_signup(self, request):
        # Re-enable when public signup is ready after testing.
        return False

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit=False)
        user.username = user.email
        if commit:
            user.save()
        return user
