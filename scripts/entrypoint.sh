#!/bin/bash
set -euo pipefail

role="${1:-web}"

python manage.py migrate --noinput

if [ "$role" = "worker" ]; then
  exec python manage.py run_monitoring_worker
fi

python manage.py collectstatic --noinput
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 120
