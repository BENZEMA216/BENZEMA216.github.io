#!/usr/bin/env python3
"""Collect daily npm download ranges for a small ranking-noise audit sample."""

import json
import statistics
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen


PACKAGES = [
    "@vigolium/piolium",
    "@hypabolic/pi-hypa",
    "pi-mcp-adapter",
    "pi-web-access",
    "pi-subagents",
    "context-mode",
    "bigpowers",
    "@nitra/cursor",
]


def main() -> None:
    output = {
        "snapshot_at_utc": datetime.now(timezone.utc).isoformat(),
        "source": "https://api.npmjs.org/downloads/range/last-month/{package}",
        "packages": {},
    }
    for package in PACKAGES:
        url = "https://api.npmjs.org/downloads/range/last-month/" + quote(package, safe="@/")
        request = Request(url, headers={"User-Agent": "pi-package-ecosystem-research/2026-07-17"})
        with urlopen(request, timeout=30) as response:
            data = json.load(response)
        daily = data.get("downloads", [])
        values = [item["downloads"] for item in daily]
        total = sum(values)
        output["packages"][package] = {
            "start": data.get("start"),
            "end": data.get("end"),
            "total": total,
            "median_daily": statistics.median(values) if values else 0,
            "peak_daily": max(values) if values else 0,
            "peak_day_share": max(values) / total if total else 0,
            "active_days": sum(value > 0 for value in values),
            "daily": daily,
        }
    path = Path(__file__).resolve().parent / "daily-download-sample.json"
    path.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(path)


if __name__ == "__main__":
    main()
