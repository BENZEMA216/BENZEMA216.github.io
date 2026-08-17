#!/usr/bin/env python3
"""Collect and analyze a point-in-time snapshot of the Pi package catalog.

Sources:
  - https://pi.dev/packages (official catalog, resource types, monthly downloads)
  - https://registry.npmjs.org/-/v1/search (npm metadata, weekly/monthly downloads)

The script deliberately treats npm downloads as traffic, not unique users.
"""

from __future__ import annotations

import csv
import json
import math
import re
import statistics
import time
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, quote, urlparse

import requests
from bs4 import BeautifulSoup


BASE_DIR = Path(__file__).resolve().parent
CATALOG_CSV = BASE_DIR / "catalog.csv"
METRICS_JSON = BASE_DIR / "metrics.json"
OVERVIEW_PNG = BASE_DIR / "overview.png"

PI_PACKAGES_URL = "https://pi.dev/packages"
NPM_SEARCH_URL = "https://registry.npmjs.org/-/v1/search"
NPM_DOWNLOADS_URL = "https://api.npmjs.org/downloads/point/last-week"
USER_AGENT = "pi-package-ecosystem-research/2026-07-17 (+https://pi.dev/packages)"
SNAPSHOT_AT = datetime.now(timezone.utc)

RESOURCE_TYPES = ("extension", "skill", "theme", "prompt")

CATEGORY_PATTERNS: dict[str, tuple[str, ...]] = {
    "orchestration_tasks": (
        r"sub[ -]?agents?",
        r"multi[ -]?agents?",
        r"orchestrat",
        r"delegat",
        r"\bswarm\b",
        r"\bworkflow",
        r"\btask(s|ing)?\b",
        r"\btodo\b",
        r"\bplanner?\b",
        r"\bplanning\b",
        r"\bgoal(s)?\b",
        r"\bautonomous\b",
        r"parallel (agent|execution)",
    ),
    "context_memory": (
        r"\bcontext",
        r"context window",
        r"\bmemory\b",
        r"long[ -]?term memory",
        r"\brag\b",
        r"\bknowledge",
        r"\bsession",
        r"\bcompaction\b",
        r"\bcompact",
        r"compress",
        r"\btoken(s)?\b",
        r"\bresume\b",
        r"\bhistory\b",
    ),
    "model_provider_usage": (
        r"\bmodels?\b",
        r"\bprovider",
        r"\bquota\b",
        r"usage limit",
        r"api proxy",
        r"\bopenrouter\b",
        r"\banthropic\b",
        r"\bopenai\b",
        r"\bgemini\b",
        r"\bminimax\b",
        r"\bollama\b",
        r"\bbedrock\b",
        r"\bcopilot\b",
    ),
    "web_research": (
        r"\bweb\b",
        r"\bbrowser",
        r"\bsearch",
        r"\bresearch",
        r"\bfetch",
        r"scrap(e|ing|er)",
        r"\burl(s)?\b",
        r"\byoutube\b",
    ),
    "developer_quality": (
        r"\blsp\b",
        r"\blint",
        r"format(ter|ting)?",
        r"\btests?\b",
        r"code review",
        r"\bdebug",
        r"type[ -]?check",
        r"code quality",
        r"\bgit\b",
        r"\bgithub\b",
        r"\brefactor",
        r"\bast\b",
    ),
    "security_permissions": (
        r"\bsecurity\b",
        r"\bpermission",
        r"\bsandbox",
        r"\bguardrail",
        r"\bpolicy\b",
        r"\bsecrets?\b",
        r"\bcredential",
        r"\baudit",
        r"\bsafe(ty)?\b",
        r"\bprotect",
        r"\bapproval",
        r"supply[ -]?chain",
    ),
    "integrations_runtime": (
        r"\bmcp\b",
        r"\badapter",
        r"\bbridge\b",
        r"\bconnector",
        r"\btelegram\b",
        r"\bslack\b",
        r"\bdiscord\b",
        r"\bjira\b",
        r"\bconfluence\b",
        r"\bremote\b",
        r"\bssh\b",
        r"\bnotification",
        r"\bwebhook",
        r"\bemail\b",
        r"\bdatabase\b",
        r"\bruntime\b",
    ),
    "ui_experience": (
        r"\btui\b",
        r"\bui\b",
        r"\bwidget",
        r"status[ -]?bar",
        r"\bdashboard",
        r"\btheme",
        r"\bspinner",
        r"\boverlay",
        r"\beditor\b",
        r"\bvisual",
    ),
    "skills_prompts_rules": (
        r"\bskills?\b",
        r"\bprompts?\b",
        r"\brules?\b",
        r"\bmethodolog",
        r"spec[ -]?driven",
        r"\bsdd\b",
        r"\btemplates?\b",
        r"\binstructions?\b",
    ),
    "observability_cost": (
        r"\btelemetry\b",
        r"\busage\b",
        r"\bcost(s|ing)?\b",
        r"\btrace",
        r"\banalytics\b",
        r"\blogging\b",
        r"\bmonitor",
        r"\bquota\b",
    ),
}


def request_text(url: str, *, params: dict[str, Any] | None = None) -> str:
    """GET with bounded retries and polite backoff."""
    last_error: Exception | None = None
    for attempt in range(7):
        try:
            response = requests.get(
                url,
                params=params,
                timeout=45,
                headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/json"},
            )
            if response.status_code == 429:
                wait = float(response.headers.get("Retry-After", 2 ** (attempt + 1)))
                time.sleep(min(wait, 30))
                continue
            if response.status_code == 404:
                raise FileNotFoundError(f"Not found: {response.url}")
            response.raise_for_status()
            return response.text
        except (requests.RequestException, ValueError) as exc:
            last_error = exc
            time.sleep(min(2 ** attempt, 20))
    raise RuntimeError(f"GET failed after retries: {url} params={params}") from last_error


def request_json(url: str, *, params: dict[str, Any] | None = None) -> dict[str, Any]:
    text = request_text(url, params=params)
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Non-JSON response from {url}: {text[:200]!r}") from exc


def parse_site_count(html: str) -> int:
    soup = BeautifulSoup(html, "html.parser")
    count = soup.select_one(".packages-count")
    if not count:
        raise RuntimeError("Could not find .packages-count")
    match = re.search(r"/\s*([\d,]+)", count.get_text(" ", strip=True))
    if not match:
        raise RuntimeError(f"Could not parse package count from {count.get_text()!r}")
    return int(match.group(1).replace(",", ""))


def parse_site_page(html: str, page: int) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    records: list[dict[str, Any]] = []
    for card in soup.select("article[data-package-card='true']"):
        name = card.get("data-package-name", "").strip()
        if not name:
            continue
        description_node = card.select_one(".packages-desc")
        meta = [node.get_text(" ", strip=True) for node in card.select(".packages-meta > span")]
        badges = [
            node.get("data-type", "").strip()
            for node in card.select(".packages-badge[data-type]")
            if node.get("data-type", "").strip()
        ]
        catalog_badge_types = sorted({item for item in badges if item in RESOURCE_TYPES})
        links = [node.get("href", "") for node in card.select(".packages-links a[href]")]
        npm_url = next((url for url in links if "npmjs.com/package/" in url), "")
        repository = next((url for url in links if "github.com/" in url and "/issues/new" not in url), "")
        report_url = next((url for url in links if "package-report" in url), "")
        version = ""
        if report_url:
            version = (parse_qs(urlparse(report_url.replace("&amp;", "&")).query).get("package-version") or [""])[0]
        timestamp_ms = int(card.get("data-package-date", "0") or 0)
        latest_publish_at = (
            datetime.fromtimestamp(timestamp_ms / 1000, tz=timezone.utc).isoformat()
            if timestamp_ms
            else ""
        )
        records.append(
            {
                "name": name,
                "description": description_node.get_text(" ", strip=True) if description_node else "",
                "author": meta[0] if len(meta) > 0 else "",
                "downloads_monthly_site": int(card.get("data-package-downloads", "0") or 0),
                "relative_publish_age": meta[2] if len(meta) > 2 else "",
                "latest_publish_at_site": latest_publish_at,
                "catalog_badge_types": catalog_badge_types,
                "site_search_text": card.get("data-package-search", ""),
                "version_site": version,
                "npm_url_site": npm_url,
                "repository_site": repository,
                "site_url": f"https://pi.dev/packages/{quote(name, safe='@/')}",
                "site_page": page,
            }
        )
    return records


def fetch_site_catalog() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    first_html = request_text(PI_PACKAGES_URL, params={"sort": "name", "page": 1})
    official_total = parse_site_count(first_html)
    page_count = math.ceil(official_total / 50)
    page_records: dict[int, list[dict[str, Any]]] = {1: parse_site_page(first_html, 1)}

    def fetch_page(page: int) -> tuple[int, list[dict[str, Any]]]:
        html = request_text(PI_PACKAGES_URL, params={"sort": "name", "page": page})
        return page, parse_site_page(html, page)

    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = [executor.submit(fetch_page, page) for page in range(2, page_count + 1)]
        for future in as_completed(futures):
            page, records = future.result()
            page_records[page] = records

    by_name: dict[str, dict[str, Any]] = {}
    duplicate_count = 0
    for page in range(1, page_count + 1):
        for record in page_records.get(page, []):
            if record["name"] in by_name:
                duplicate_count += 1
            by_name[record["name"]] = record

    return sorted(by_name.values(), key=lambda item: item["name"].lower()), {
        "reported_total": official_total,
        "pages": page_count,
        "retrieved_rows": sum(len(rows) for rows in page_records.values()),
        "unique_rows": len(by_name),
        "duplicate_rows": duplicate_count,
    }


def simplify_npm_object(obj: dict[str, Any]) -> dict[str, Any]:
    package = obj.get("package") or {}
    downloads = obj.get("downloads") or {}
    links = package.get("links") or {}
    publisher = package.get("publisher") or {}
    maintainers = package.get("maintainers") or []
    score = (obj.get("score") or {}).get("detail") or {}
    return {
        "name": package.get("name", ""),
        "description_npm": package.get("description", "") or "",
        "version_npm": package.get("version", "") or "",
        "keywords": [item for item in (package.get("keywords") or []) if isinstance(item, str)],
        "latest_publish_at_npm": package.get("date", "") or "",
        "publisher": publisher.get("username", "") or "",
        "maintainers": [item.get("username", "") for item in maintainers if item.get("username")],
        "license": package.get("license", "") or "",
        "repository_npm": links.get("repository", "") or "",
        "homepage": links.get("homepage", "") or "",
        "npm_url_npm": links.get("npm", "") or "",
        "downloads_monthly_npm": int(downloads.get("monthly", 0) or 0),
        "downloads_weekly": int(downloads.get("weekly", 0) or 0),
        "dependents": int(obj.get("dependents", 0) or 0),
        "search_score": float(obj.get("searchScore", 0) or 0),
        "quality_score": float(score.get("quality", 0) or 0),
        "popularity_score": float(score.get("popularity", 0) or 0),
        "maintenance_score": float(score.get("maintenance", 0) or 0),
        "insecure_flag": int((obj.get("flags") or {}).get("insecure", 0) or 0),
    }


def fetch_npm_catalog() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    base_params = {"text": "keywords:pi-package", "size": 250}
    first = request_json(NPM_SEARCH_URL, params={**base_params, "from": 0})
    reported_total = int(first.get("total", 0))
    all_objects = list(first.get("objects") or [])
    requests_made = 1
    for start in range(250, reported_total, 250):
        time.sleep(0.2)
        page = request_json(NPM_SEARCH_URL, params={**base_params, "from": start})
        all_objects.extend(page.get("objects") or [])
        requests_made += 1

    by_name: dict[str, dict[str, Any]] = {}
    for obj in all_objects:
        record = simplify_npm_object(obj)
        if record["name"]:
            by_name[record["name"]] = record
    return sorted(by_name.values(), key=lambda item: item["name"].lower()), {
        "reported_total": reported_total,
        "retrieved_rows": len(all_objects),
        "unique_rows": len(by_name),
        "requests": requests_made,
        "api_time": first.get("time", ""),
    }


def simplify_latest_manifest(data: dict[str, Any]) -> dict[str, Any]:
    pi_manifest = data.get("pi") if isinstance(data.get("pi"), dict) else None
    manifest_resource_types = []
    manifest_resource_counts: dict[str, int] = {}
    if pi_manifest:
        for resource_type, manifest_key in (
            ("extension", "extensions"),
            ("skill", "skills"),
            ("prompt", "prompts"),
            ("theme", "themes"),
        ):
            paths = pi_manifest.get(manifest_key)
            if isinstance(paths, list) and paths:
                manifest_resource_types.append(resource_type)
                manifest_resource_counts[resource_type] = len(paths)

    scripts = data.get("scripts") if isinstance(data.get("scripts"), dict) else {}
    lifecycle_script_names = sorted(
        name
        for name in scripts
        if name
        in {
            "preinstall",
            "install",
            "postinstall",
            "prepublish",
            "prepublishOnly",
            "prepare",
        }
    )
    dependencies = data.get("dependencies") if isinstance(data.get("dependencies"), dict) else {}
    optional_dependencies = (
        data.get("optionalDependencies")
        if isinstance(data.get("optionalDependencies"), dict)
        else {}
    )
    peer_dependencies = (
        data.get("peerDependencies") if isinstance(data.get("peerDependencies"), dict) else {}
    )
    dist = data.get("dist") if isinstance(data.get("dist"), dict) else {}
    engines = data.get("engines") if isinstance(data.get("engines"), dict) else {}
    return {
        "manifest_fetched": True,
        "description_manifest": data.get("description", "") or "",
        "version_manifest": data.get("version", "") or "",
        "keywords_manifest": [
            item for item in (data.get("keywords") or []) if isinstance(item, str)
        ],
        "explicit_pi_manifest": bool(pi_manifest),
        "pi_manifest": pi_manifest or {},
        "manifest_resource_types": sorted(manifest_resource_types),
        "manifest_resource_counts": manifest_resource_counts,
        "has_preview_image": bool(pi_manifest and pi_manifest.get("image")),
        "has_preview_video": bool(pi_manifest and pi_manifest.get("video")),
        "dependency_count": len(dependencies),
        "optional_dependency_count": len(optional_dependencies),
        "peer_dependency_count": len(peer_dependencies),
        "lifecycle_script_names": lifecycle_script_names,
        "has_install_lifecycle_script": any(
            name in lifecycle_script_names for name in ("preinstall", "install", "postinstall")
        ),
        "node_engine": engines.get("node", "") or "",
        "unpacked_size": int(dist.get("unpackedSize", 0) or 0),
        "file_count": int(dist.get("fileCount", 0) or 0),
        "manifest_deprecated": data.get("deprecated", "") or "",
    }


def fetch_latest_manifests(
    site_records: list[dict[str, Any]],
) -> tuple[dict[str, dict[str, Any]], dict[str, Any]]:
    """Fetch authoritative latest package.json manifests for catalog entries."""

    def fetch_one(name: str) -> tuple[str, dict[str, Any]]:
        encoded_name = quote(name, safe="")
        try:
            data = request_json(f"https://registry.npmjs.org/{encoded_name}/latest")
            return name, simplify_latest_manifest(data)
        except FileNotFoundError:
            return name, {"manifest_fetched": False, "manifest_error": "not_found"}
        except Exception as exc:  # Keep a complete audit trail instead of aborting 5k rows.
            return name, {"manifest_fetched": False, "manifest_error": type(exc).__name__}

    by_name: dict[str, dict[str, Any]] = {}
    with ThreadPoolExecutor(max_workers=16) as executor:
        futures = [executor.submit(fetch_one, record["name"]) for record in site_records]
        for index, future in enumerate(as_completed(futures), start=1):
            name, manifest = future.result()
            by_name[name] = manifest
            if index % 500 == 0:
                print(f"  manifests: {index}/{len(futures)}", flush=True)

    fetched = sum(bool(item.get("manifest_fetched")) for item in by_name.values())
    return by_name, {
        "requested": len(site_records),
        "fetched": fetched,
        "failed": len(site_records) - fetched,
        "explicit_pi_manifests": sum(
            bool(item.get("explicit_pi_manifest")) for item in by_name.values()
        ),
    }


def fetch_missing_weekly_downloads(
    site_records: list[dict[str, Any]], npm_records: list[dict[str, Any]]
) -> tuple[dict[str, int], dict[str, Any]]:
    npm_names = {record["name"] for record in npm_records}
    missing_names = [record["name"] for record in site_records if record["name"] not in npm_names]

    def fetch_one(name: str) -> tuple[str, int | None]:
        try:
            encoded_name = quote(name, safe="@/")
            data = request_json(f"{NPM_DOWNLOADS_URL}/{encoded_name}")
            return name, int(data.get("downloads", 0) or 0)
        except Exception:
            return name, None

    results: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(fetch_one, name) for name in missing_names]
        for future in as_completed(futures):
            name, downloads = future.result()
            if downloads is not None:
                results[name] = downloads
    return results, {
        "requested": len(missing_names),
        "fetched": len(results),
        "failed": len(missing_names) - len(results),
    }


def normalize_repository(value: str) -> str:
    value = value.strip()
    if not value:
        return ""
    value = re.sub(r"^git\+", "", value)
    value = re.sub(r"^git://github\.com/", "https://github.com/", value)
    value = re.sub(r"^git@github\.com:", "https://github.com/", value)
    value = value.split("#", 1)[0]
    value = re.sub(r"\.git$", "", value)
    return value.rstrip("/")


def native_confidence(record: dict[str, Any]) -> str:
    if record.get("explicit_pi_manifest"):
        return "explicit_pi_manifest"
    keywords = {item.lower() for item in record["keywords"]}
    strong_keywords = {
        "pi-extension",
        "pi-skill",
        "pi-theme",
        "pi-prompt",
        "pi-agent",
        "pi-coding-agent",
    }
    text = " ".join(
        [record["name"], record["description"], " ".join(record["keywords"])]
    ).lower()
    explicit_phrases = (
        "pi coding agent",
        "pi agent",
        "pi extension",
        "pi skill",
        "pi package",
        "for pi",
        "pi.dev",
        "pi's ",
    )
    name = record["name"].lower()
    pi_shaped_name = bool(re.match(r"^pi[-_]", name) or re.search(r"/pi(?:[-_]|$)", name))
    if keywords & strong_keywords or any(phrase in text for phrase in explicit_phrases) or pi_shaped_name:
        return "convention_or_self_described"
    return "tag_only_no_manifest_ambiguous"


def semantic_categories(record: dict[str, Any]) -> list[str]:
    text = " ".join(
        [record["name"], record["description"], " ".join(record["keywords"])]
    ).lower()
    labels = [
        category
        for category, patterns in CATEGORY_PATTERNS.items()
        if any(re.search(pattern, text) for pattern in patterns)
    ]
    return sorted(labels)


def parse_iso(value: str) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def join_catalogs(
    site_records: list[dict[str, Any]],
    npm_records: list[dict[str, Any]],
    manifests: dict[str, dict[str, Any]],
    missing_weekly_downloads: dict[str, int],
) -> list[dict[str, Any]]:
    npm_by_name = {record["name"]: record for record in npm_records}
    joined: list[dict[str, Any]] = []
    for site in site_records:
        npm = npm_by_name.get(site["name"], {})
        manifest = manifests.get(site["name"], {"manifest_fetched": False})
        latest_publish_at = npm.get("latest_publish_at_npm") or site["latest_publish_at_site"]
        published = parse_iso(latest_publish_at)
        days_since_publish = (
            max(0.0, (SNAPSHOT_AT - published).total_seconds() / 86400) if published else None
        )
        description = (
            npm.get("description_npm") or manifest.get("description_manifest") or site["description"]
        )
        record = {
            **site,
            **npm,
            **manifest,
            "description": description,
            "version": (
                npm.get("version_npm") or manifest.get("version_manifest") or site["version_site"]
            ),
            "downloads_monthly": int(
                npm.get("downloads_monthly_npm", site["downloads_monthly_site"]) or 0
            ),
            "downloads_weekly": int(
                npm.get("downloads_weekly", missing_weekly_downloads.get(site["name"], 0)) or 0
            ),
            "latest_publish_at": latest_publish_at,
            "days_since_publish": round(days_since_publish, 3) if days_since_publish is not None else None,
            "keywords": npm.get("keywords") or manifest.get("keywords_manifest") or [],
            "maintainers": npm.get("maintainers", []),
            "repository": normalize_repository(
                npm.get("repository_npm") or site["repository_site"]
            ),
            "npm_url": npm.get("npm_url_npm") or site["npm_url_site"],
            "npm_joined": bool(npm),
        }
        record["native_confidence"] = native_confidence(record)
        record["semantic_categories"] = semantic_categories(record)
        joined.append(record)
    return sorted(joined, key=lambda item: item["name"].lower())


def percentile(values: list[int], p: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    position = (len(ordered) - 1) * p
    lower = math.floor(position)
    upper = math.ceil(position)
    if lower == upper:
        return float(ordered[lower])
    weight = position - lower
    return ordered[lower] * (1 - weight) + ordered[upper] * weight


def gini(values: list[int]) -> float:
    ordered = sorted(max(0, value) for value in values)
    if not ordered or sum(ordered) == 0:
        return 0.0
    n = len(ordered)
    weighted = sum((index + 1) * value for index, value in enumerate(ordered))
    return (2 * weighted) / (n * sum(ordered)) - (n + 1) / n


def top_share(values: list[int], count: int) -> float:
    total = sum(values)
    if total == 0:
        return 0.0
    return sum(sorted(values, reverse=True)[:count]) / total


def distribution_metrics(records: list[dict[str, Any]], field: str) -> dict[str, Any]:
    values = [int(record[field]) for record in records]
    return {
        "sum": sum(values),
        "mean": statistics.mean(values) if values else 0,
        "median": statistics.median(values) if values else 0,
        "p75": percentile(values, 0.75),
        "p90": percentile(values, 0.90),
        "p95": percentile(values, 0.95),
        "p99": percentile(values, 0.99),
        "max": max(values) if values else 0,
        "zero_count": sum(value == 0 for value in values),
        "lt10_count": sum(value < 10 for value in values),
        "lt50_count": sum(value < 50 for value in values),
        "ge350_count": sum(value >= 350 for value in values),
        "ge1000_count": sum(value >= 1000 for value in values),
        "gini": gini(values),
        "top1_share": top_share(values, 1),
        "top10_share": top_share(values, 10),
        "top50_share": top_share(values, 50),
        "top100_share": top_share(values, 100),
    }


def record_summary(record: dict[str, Any]) -> dict[str, Any]:
    monthly = int(record["downloads_monthly"])
    weekly = int(record["downloads_weekly"])
    current_run_rate = (weekly * 30 / 7 / monthly) if monthly else None
    return {
        "name": record["name"],
        "description": record["description"],
        "author": record["author"],
        "version": record["version"],
        "manifest_types": record.get("manifest_resource_types", []),
        "catalog_badge_types": record["catalog_badge_types"],
        "native_confidence": record["native_confidence"],
        "downloads_monthly": monthly,
        "downloads_weekly": weekly,
        "weekly_to_monthly_run_rate": round(current_run_rate, 4) if current_run_rate is not None else None,
        "latest_publish_at": record["latest_publish_at"],
        "site_url": record["site_url"],
        "repository": record["repository"],
    }


def build_metrics(
    records: list[dict[str, Any]],
    site_meta: dict[str, Any],
    npm_meta: dict[str, Any],
    manifest_meta: dict[str, Any],
    missing_download_meta: dict[str, Any],
) -> dict[str, Any]:
    core = [
        record
        for record in records
        if record["native_confidence"] != "tag_only_no_manifest_ambiguous"
    ]
    confidence = Counter(record["native_confidence"] for record in records)
    explicit_manifest_records = [record for record in records if record.get("explicit_pi_manifest")]

    manifest_resource_counts = Counter()
    manifest_combination_counts = Counter()
    catalog_badge_counts = Counter()
    catalog_badge_combinations = Counter()
    for record in explicit_manifest_records:
        types = record.get("manifest_resource_types", [])
        manifest_combination_counts["+".join(types) if types else "manifest_without_resources"] += 1
        for resource_type in types:
            manifest_resource_counts[resource_type] += 1
    for record in records:
        types = record["catalog_badge_types"]
        catalog_badge_combinations["+".join(types) if types else "untyped"] += 1
        for resource_type in types:
            catalog_badge_counts[resource_type] += 1

    manifest_type_metrics: dict[str, Any] = {}
    for resource_type in RESOURCE_TYPES:
        subset = [
            record
            for record in explicit_manifest_records
            if resource_type in record.get("manifest_resource_types", [])
        ]
        manifest_type_metrics[resource_type] = {
            "packages": len(subset),
            "weekly_downloads": sum(record["downloads_weekly"] for record in subset),
            "monthly_downloads": sum(record["downloads_monthly"] for record in subset),
            "weekly_median": statistics.median(
                [record["downloads_weekly"] for record in subset]
            )
            if subset
            else 0,
        }

    badge_match_exact = 0
    badge_missing_types = 0
    badge_extra_or_wrong = 0
    badge_mismatch_examples = []
    for record in explicit_manifest_records:
        manifest_types = set(record.get("manifest_resource_types", []))
        badge_types = set(record["catalog_badge_types"])
        if manifest_types == badge_types:
            badge_match_exact += 1
        else:
            if manifest_types - badge_types:
                badge_missing_types += 1
            if badge_types - manifest_types:
                badge_extra_or_wrong += 1
            badge_mismatch_examples.append(
                {
                    "name": record["name"],
                    "manifest_types": sorted(manifest_types),
                    "catalog_badge_types": sorted(badge_types),
                    "downloads_weekly": record["downloads_weekly"],
                    "site_url": record["site_url"],
                }
            )
    badge_mismatch_examples.sort(key=lambda item: item["downloads_weekly"], reverse=True)

    freshness_bins = Counter()
    for record in records:
        age = record["days_since_publish"]
        if age is None:
            freshness_bins["unknown"] += 1
        elif age <= 1:
            freshness_bins["0-1d"] += 1
        elif age <= 7:
            freshness_bins["2-7d"] += 1
        elif age <= 30:
            freshness_bins["8-30d"] += 1
        elif age <= 90:
            freshness_bins["31-90d"] += 1
        else:
            freshness_bins[">90d"] += 1

    activity_bins = Counter()
    for record in records:
        weekly = record["downloads_weekly"]
        if weekly == 0:
            activity_bins["0"] += 1
        elif weekly < 10:
            activity_bins["1-9"] += 1
        elif weekly < 50:
            activity_bins["10-49"] += 1
        elif weekly < 350:
            activity_bins["50-349"] += 1
        else:
            activity_bins[">=350"] += 1

    category_metrics: dict[str, Any] = {}
    for category in CATEGORY_PATTERNS:
        subset = [record for record in core if category in record["semantic_categories"]]
        category_metrics[category] = {
            "packages": len(subset),
            "weekly_downloads": sum(record["downloads_weekly"] for record in subset),
            "monthly_downloads": sum(record["downloads_monthly"] for record in subset),
            "weekly_median": statistics.median(
                [record["downloads_weekly"] for record in subset]
            )
            if subset
            else 0,
        }

    author_packages: defaultdict[str, int] = defaultdict(int)
    author_weekly: defaultdict[str, int] = defaultdict(int)
    author_monthly: defaultdict[str, int] = defaultdict(int)
    for record in records:
        author = record["author"] or record.get("publisher") or "unknown"
        author_packages[author] += 1
        author_weekly[author] += record["downloads_weekly"]
        author_monthly[author] += record["downloads_monthly"]

    repositories = [record["repository"] for record in records if record["repository"]]
    repo_counts = Counter(repositories)
    top_authors_by_packages = sorted(
        author_packages, key=lambda author: (author_packages[author], author_weekly[author]), reverse=True
    )[:20]
    top_authors_by_weekly = sorted(author_weekly, key=author_weekly.get, reverse=True)[:20]

    monthly_ranked = sorted(records, key=lambda record: record["downloads_monthly"], reverse=True)
    weekly_ranked = sorted(records, key=lambda record: record["downloads_weekly"], reverse=True)

    run_rate_bins = Counter()
    for record in records:
        monthly = record["downloads_monthly"]
        weekly = record["downloads_weekly"]
        if monthly < 30:
            run_rate_bins["low_volume"] += 1
            continue
        ratio = weekly * 30 / 7 / monthly
        if ratio < 0.25:
            run_rate_bins["cooling_or_spiky"] += 1
        elif ratio > 2:
            run_rate_bins["accelerating_or_new"] += 1
        else:
            run_rate_bins["roughly_current"] += 1

    dependency_counts = [record.get("dependency_count", 0) for record in records]
    packages_with_preview = sum(
        bool(record.get("has_preview_image") or record.get("has_preview_video"))
        for record in records
    )
    packages_with_install_scripts = sum(
        bool(record.get("has_install_lifecycle_script")) for record in records
    )
    packages_with_any_lifecycle_scripts = sum(
        bool(record.get("lifecycle_script_names")) for record in records
    )
    manifest_schema = Counter()
    for record in explicit_manifest_records:
        pi_manifest = record.get("pi_manifest") or {}
        resource_values = {
            key: pi_manifest[key]
            for key in ("extensions", "skills", "prompts", "themes")
            if key in pi_manifest
        }
        has_valid_resource = any(
            isinstance(value, list) and bool(value) for value in resource_values.values()
        )
        if has_valid_resource:
            manifest_schema["valid_nonempty_resource_arrays"] += 1
        else:
            manifest_schema["no_valid_loadable_resources"] += 1
        if not resource_values:
            manifest_schema["no_current_resource_keys"] += 1
        elif all(isinstance(value, list) and not value for value in resource_values.values()):
            manifest_schema["all_resource_arrays_empty"] += 1
        if any(not isinstance(value, list) for value in resource_values.values()):
            manifest_schema["resource_value_wrong_type"] += 1

    return {
        "snapshot_at_utc": SNAPSHOT_AT.isoformat(),
        "scope_note": "Official pi.dev catalog rows joined to npm search metadata. Downloads are HTTP package traffic, not unique users.",
        "site_collection": site_meta,
        "npm_collection": npm_meta,
        "manifest_collection": manifest_meta,
        "missing_weekly_download_collection": missing_download_meta,
        "joined_rows": len(records),
        "npm_join_coverage": sum(record["npm_joined"] for record in records),
        "native_confidence": dict(confidence),
        "native_core_rows": len(core),
        "explicit_pi_manifest_rows": len(explicit_manifest_records),
        "manifest_resource_type_counts": dict(manifest_resource_counts),
        "manifest_resource_type_combinations": dict(manifest_combination_counts),
        "manifest_resource_type_metrics": manifest_type_metrics,
        "catalog_badge_type_counts": dict(catalog_badge_counts),
        "catalog_badge_type_combinations": dict(catalog_badge_combinations),
        "catalog_badge_audit_against_manifest": {
            "explicit_manifests_audited": len(explicit_manifest_records),
            "exact_match": badge_match_exact,
            "missing_one_or_more_manifest_types": badge_missing_types,
            "extra_or_wrong_badge_type": badge_extra_or_wrong,
            "top_mismatch_examples": badge_mismatch_examples[:30],
        },
        "manifest_quality": {
            "packages_with_preview": packages_with_preview,
            "packages_with_install_lifecycle_script": packages_with_install_scripts,
            "packages_with_any_lifecycle_script": packages_with_any_lifecycle_scripts,
            "packages_with_repository": len(repositories),
            "packages_without_license": sum(not record.get("license") for record in records),
            "deprecated_packages": sum(bool(record.get("manifest_deprecated")) for record in records),
            "dependency_median": statistics.median(dependency_counts) if dependency_counts else 0,
            "dependency_p90": percentile(dependency_counts, 0.90),
            "dependency_p99": percentile(dependency_counts, 0.99),
        },
        "pi_manifest_schema_audit": dict(manifest_schema),
        "latest_publish_freshness_bins": dict(freshness_bins),
        "weekly_activity_bins": dict(activity_bins),
        "run_rate_bins": dict(run_rate_bins),
        "weekly_distribution": distribution_metrics(records, "downloads_weekly"),
        "monthly_distribution": distribution_metrics(records, "downloads_monthly"),
        "native_core_weekly_distribution": distribution_metrics(core, "downloads_weekly"),
        "native_core_monthly_distribution": distribution_metrics(core, "downloads_monthly"),
        "semantic_category_metrics_native_core_multilabel": category_metrics,
        "authors": {
            "unique": len(author_packages),
            "single_package_authors": sum(count == 1 for count in author_packages.values()),
            "top_by_package_count": [
                {
                    "author": author,
                    "packages": author_packages[author],
                    "weekly_downloads": author_weekly[author],
                    "monthly_downloads": author_monthly[author],
                }
                for author in top_authors_by_packages
            ],
            "top_by_weekly_downloads": [
                {
                    "author": author,
                    "packages": author_packages[author],
                    "weekly_downloads": author_weekly[author],
                    "monthly_downloads": author_monthly[author],
                }
                for author in top_authors_by_weekly
            ],
        },
        "repositories": {
            "packages_with_repository": len(repositories),
            "unique_repositories": len(repo_counts),
            "multi_package_repositories": sum(count > 1 for count in repo_counts.values()),
            "top_by_package_count": [
                {"repository": repository, "packages": count}
                for repository, count in repo_counts.most_common(20)
            ],
        },
        "top_monthly": [record_summary(record) for record in monthly_ranked[:30]],
        "top_weekly": [record_summary(record) for record in weekly_ranked[:30]],
    }


def write_csv(records: list[dict[str, Any]]) -> None:
    fields = [
        "name",
        "description",
        "author",
        "publisher",
        "maintainers",
        "version",
        "catalog_badge_types",
        "explicit_pi_manifest",
        "manifest_resource_types",
        "manifest_resource_counts",
        "pi_manifest",
        "native_confidence",
        "semantic_categories",
        "downloads_monthly",
        "downloads_weekly",
        "latest_publish_at",
        "days_since_publish",
        "dependents",
        "dependency_count",
        "optional_dependency_count",
        "peer_dependency_count",
        "lifecycle_script_names",
        "has_install_lifecycle_script",
        "has_preview_image",
        "has_preview_video",
        "unpacked_size",
        "file_count",
        "node_engine",
        "license",
        "keywords",
        "repository",
        "homepage",
        "npm_url",
        "site_url",
        "site_page",
        "npm_joined",
    ]
    with CATALOG_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for record in records:
            row = {field: record.get(field, "") for field in fields}
            for field in (
                "maintainers",
                "catalog_badge_types",
                "manifest_resource_types",
                "semantic_categories",
                "keywords",
                "lifecycle_script_names",
            ):
                row[field] = "|".join(row[field]) if isinstance(row[field], list) else row[field]
            for field in ("manifest_resource_counts", "pi_manifest"):
                if isinstance(row[field], dict):
                    row[field] = json.dumps(row[field], ensure_ascii=False, separators=(",", ":"))
            writer.writerow(row)


def write_overview_chart(metrics: dict[str, Any]) -> None:
    try:
        import matplotlib.pyplot as plt
        from matplotlib.ticker import FuncFormatter
    except ImportError:
        return

    fig, axes = plt.subplots(2, 2, figsize=(14, 9))
    fig.suptitle("Pi package ecosystem snapshot — 2026-07-17", fontsize=18, fontweight="bold")

    confidence_order = (
        "explicit_pi_manifest",
        "convention_or_self_described",
        "tag_only_no_manifest_ambiguous",
    )
    confidence_labels = ("Explicit pi manifest", "Convention / self-described", "Tag-only / ambiguous")
    confidence_values = [metrics["native_confidence"].get(key, 0) for key in confidence_order]
    axes[0, 0].bar(confidence_labels, confidence_values, color=("#5B8FF9", "#61DDAA", "#F6BD16"))
    axes[0, 0].set_title("Catalog confidence layers")
    axes[0, 0].tick_params(axis="x", rotation=15)
    for index, value in enumerate(confidence_values):
        axes[0, 0].text(index, value, f"{value:,}", ha="center", va="bottom")

    activity_order = ("0", "1-9", "10-49", "50-349", ">=350")
    activity_values = [metrics["weekly_activity_bins"].get(key, 0) for key in activity_order]
    axes[0, 1].bar(activity_order, activity_values, color="#65789B")
    axes[0, 1].set_title("Weekly npm download traffic per package")
    axes[0, 1].set_xlabel("Downloads in last 7 available days")
    for index, value in enumerate(activity_values):
        axes[0, 1].text(index, value, f"{value:,}", ha="center", va="bottom")

    type_order = ("extension", "skill", "theme", "prompt", "no explicit pi")
    type_values = [
        metrics["manifest_resource_type_metrics"][key]["packages"]
        for key in type_order[:-1]
    ] + [metrics["joined_rows"] - metrics["explicit_pi_manifest_rows"]]
    axes[1, 0].bar(type_order, type_values, color="#7262FD")
    axes[1, 0].set_title("Authoritative package.json pi resources (multi-label)")
    for index, value in enumerate(type_values):
        axes[1, 0].text(index, value, f"{value:,}", ha="center", va="bottom")

    top = metrics["top_weekly"][:10][::-1]
    axes[1, 1].barh([item["name"] for item in top], [item["downloads_weekly"] for item in top], color="#F08BB4")
    axes[1, 1].set_title("Top current weekly npm traffic")
    axes[1, 1].xaxis.set_major_formatter(FuncFormatter(lambda value, _: f"{int(value):,}"))

    for axis in axes.flat:
        axis.spines[["top", "right"]].set_visible(False)
        axis.grid(axis="y", alpha=0.15)
    fig.tight_layout(rect=(0, 0, 1, 0.96))
    fig.savefig(OVERVIEW_PNG, dpi=180, bbox_inches="tight")
    plt.close(fig)


def main() -> None:
    print("Collecting official pi.dev package catalog...", flush=True)
    site_records, site_meta = fetch_site_catalog()
    print(json.dumps(site_meta, indent=2), flush=True)

    print("Collecting npm search metadata...", flush=True)
    npm_records, npm_meta = fetch_npm_catalog()
    print(json.dumps(npm_meta, indent=2), flush=True)

    print("Fetching authoritative latest package.json manifests...", flush=True)
    manifests, manifest_meta = fetch_latest_manifests(site_records)
    print(json.dumps(manifest_meta, indent=2), flush=True)

    print("Backfilling weekly downloads outside npm search's result window...", flush=True)
    missing_weekly, missing_download_meta = fetch_missing_weekly_downloads(
        site_records, npm_records
    )
    print(json.dumps(missing_download_meta, indent=2), flush=True)

    records = join_catalogs(site_records, npm_records, manifests, missing_weekly)
    metrics = build_metrics(
        records, site_meta, npm_meta, manifest_meta, missing_download_meta
    )
    write_csv(records)
    METRICS_JSON.write_text(json.dumps(metrics, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_overview_chart(metrics)

    print(f"Wrote {CATALOG_CSV} ({len(records)} rows)")
    print(f"Wrote {METRICS_JSON}")
    if OVERVIEW_PNG.exists():
        print(f"Wrote {OVERVIEW_PNG}")


if __name__ == "__main__":
    main()
