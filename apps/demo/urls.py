from django.urls import path

from apps.demo import views

app_name = "demo"

urlpatterns = [
    path("", views.landing, name="landing"),
    path("run/", views.run_scenario, name="run_scenario"),
]
