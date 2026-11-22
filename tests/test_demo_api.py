import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_home_ok(client):
    response = client.get(reverse("home"))
    assert response.status_code == 200
    assert b"ToravoTech" in response.content
    assert b"Our services" in response.content
    assert b"Arrival monitoring" in response.content
    assert b"Ops dashboard" in response.content


@pytest.mark.django_db
def test_demo_scenario(client):
    response = client.post(reverse("demo:run_scenario"), {"scenario": "arrival_missing"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "fail"


@pytest.mark.django_db
def test_collector_heartbeat(client):
    response = client.get("/api/collector/heartbeat/")
    assert response.status_code == 200
    assert response.json()["ok"] is True


@pytest.mark.django_db
def test_open_services_without_login(client):
    response = client.get("/app/")
    assert response.status_code == 200
    assert b"Dashboard" in response.content
    assert b"Nightly orders parquet" in response.content
