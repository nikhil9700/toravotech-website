# ToravoTech

Feed monitoring SaaS — know when S3 arrivals and Snowflake freshness stall before the business asks.

## Stack

- Django 5.2 + django-allauth
- Postgres
- Docker Compose (`web`, `worker`, `db`, `mailpit`)
- S3 (AssumeRole) and Snowflake collectors
- Demo/fixture collector for local checks without cloud credentials

## Local (Docker)

```bash
cp .env.example .env
docker compose up --build
```

- App: http://localhost:8000
- Mailpit: http://localhost:8025

Create a superuser:

```bash
docker compose exec web python manage.py createsuperuser
```

## Local (without Docker)

```bash
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
# set DATABASE_URL to sqlite for quick local: sqlite:///./db.sqlite3
python manage.py migrate
python manage.py runserver
```

Worker (separate terminal):

```bash
python manage.py run_monitoring_worker
```

## Tests

```bash
pytest
```

## Pricing

- Completely free: unlimited monitors, email alerts, S3 and Snowflake connectors
- Email notifications via SMTP (Mailpit locally)

## Deploy notes

Production target: Railway (web + worker + Postgres). Keep GitHub Pages workflow removed — this is a dynamic Django app, not a static export. Point `toravotech.com` DNS at Railway after the app is healthy locally and you approve go-live.
