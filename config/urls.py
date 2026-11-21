from django.contrib import admin
from django.urls import include, path

from apps.demo import views as demo_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("", demo_views.home, name="home"),
    path("demo/", include("apps.demo.urls")),
    path("app/", include("apps.monitoring.urls")),
    path("app/workspace/", include("apps.workspaces.urls")),
    path("app/connections/", include("apps.integrations.urls")),
    path("api/collector/", include("apps.integrations.collector_urls")),
]
