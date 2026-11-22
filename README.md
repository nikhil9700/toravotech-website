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

## Why GitHub push ≠ live site

`toravotech.com` is still on **GitHub Pages** (old Next.js static site).  
This repo is now **Django**, which cannot run on GitHub Pages.

**Live path:** deploy Django to **Railway** (web + Postgres + optional worker), then point `toravotech.com` DNS to Railway and turn off GitHub Pages.

### Railway (quick)

1. Create a Railway project from this GitHub repo
2. Add a Postgres plugin
3. Set env vars (see `.env.example`), especially:
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS` (Railway domain + `toravotech.com`)
   - `DJANGO_CSRF_TRUSTED_ORIGINS` (`https://...`)
   - `DATABASE_URL` (from Railway Postgres)
4. Deploy web service with Dockerfile / `railway.toml`
5. Add a second service for the worker: `/app/scripts/entrypoint.sh worker`
6. Point Namecheap DNS A/CNAME away from GitHub Pages to Railway
