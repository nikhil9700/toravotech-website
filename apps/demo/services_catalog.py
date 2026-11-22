"""Public services customers can select on the home page."""

SERVICES = [
    {
        "slug": "arrival",
        "group": "monitoring",
        "group_label": "Monitoring",
        "icon": "arrival",
        "name": "Arrival monitoring",
        "tagline": "Did the expected file land on time?",
        "description": (
            "Watch an S3 object or path on a schedule. If the feed is missing "
            "or older than your window, ToravoTech opens an incident."
        ),
        "includes": [
            "S3 object / prefix checks",
            "Max-age window",
            "Pass / fail history",
        ],
        "action_label": "Use arrival monitoring",
        "href": "/app/monitors/new/?check_type=arrival&source_type=s3",
    },
    {
        "slug": "row-count",
        "group": "monitoring",
        "group_label": "Monitoring",
        "icon": "rows",
        "name": "Row count monitoring",
        "tagline": "Is the load the right size?",
        "description": (
            "Query Snowflake for row counts and alert when a table is too thin "
            "or unexpectedly huge after a pipeline run."
        ),
        "includes": [
            "Min / max bounds",
            "Table or view",
            "Out-of-range incidents",
        ],
        "action_label": "Use row count monitoring",
        "href": "/app/monitors/new/?check_type=row_count&source_type=snowflake",
    },
    {
        "slug": "freshness",
        "group": "monitoring",
        "group_label": "Monitoring",
        "icon": "freshness",
        "name": "Freshness monitoring",
        "tagline": "Is the watermark still moving?",
        "description": (
            "Track the newest timestamp in a Snowflake table. Catch stalled "
            "pipelines when data stops updating."
        ),
        "includes": [
            "Watermark column",
            "Configurable max age",
            "Stale → incident",
        ],
        "action_label": "Use freshness monitoring",
        "href": "/app/monitors/new/?check_type=freshness&source_type=snowflake",
    },
    {
        "slug": "s3-connection",
        "group": "connections",
        "group_label": "Connections",
        "icon": "s3",
        "name": "Amazon S3",
        "tagline": "Connect your bucket safely",
        "description": (
            "Add bucket, region, and optional AssumeRole so arrival monitors "
            "can read your feeds without sharing long-lived keys."
        ),
        "includes": [
            "Bucket + region",
            "IAM role / external ID",
            "Reusable connectors",
        ],
        "action_label": "Connect Amazon S3",
        "href": "/app/connections/new/?kind=s3",
    },
    {
        "slug": "snowflake-connection",
        "group": "connections",
        "group_label": "Connections",
        "icon": "snowflake",
        "name": "Snowflake",
        "tagline": "Connect your warehouse",
        "description": (
            "Wire account, warehouse, and database access so row count and "
            "freshness monitors can query live tables."
        ),
        "includes": [
            "Account + warehouse",
            "Read-only recommended",
            "Shared by monitors",
        ],
        "action_label": "Connect Snowflake",
        "href": "/app/connections/new/?kind=snowflake",
    },
    {
        "slug": "dashboard",
        "group": "ops",
        "group_label": "Operations",
        "icon": "dashboard",
        "name": "Ops dashboard",
        "tagline": "Incidents and recent checks in one place",
        "description": (
            "See active monitors, open incidents, and the latest check results. "
            "Acknowledge failures and jump into any monitor."
        ),
        "includes": [
            "Incident list",
            "Acknowledge failures",
            "Monitor deep links",
        ],
        "action_label": "Open dashboard",
        "href": "/app/",
    },
]

GROUP_ORDER = ["monitoring", "connections", "ops"]

GROUP_META = {
    "monitoring": {
        "label": "Monitoring",
        "blurb": "Catch late, thin, or stale feeds before the business asks.",
    },
    "connections": {
        "label": "Connections",
        "blurb": "Point ToravoTech at your S3 buckets and Snowflake warehouses.",
    },
    "ops": {
        "label": "Operations",
        "blurb": "Run the day-to-day view of checks and incidents.",
    },
}


def services_by_group():
    grouped = []
    for key in GROUP_ORDER:
        items = [s for s in SERVICES if s["group"] == key]
        if items:
            meta = GROUP_META[key]
            grouped.append(
                {
                    "key": key,
                    "label": meta["label"],
                    "blurb": meta["blurb"],
                    "services": items,
                }
            )
    return grouped
