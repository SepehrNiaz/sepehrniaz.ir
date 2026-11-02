#!/usr/bin/env python3
"""Watch the devices on a network and build an HTML status dashboard.

Every device in devices.csv (switches, access points, cameras, printers,
servers...) is checked with ping or a TCP port. Results are stored in a
small SQLite database so you can see uptime over time, and a self-contained
dashboard.html is written after each round.

Examples:
    python3 monitor.py devices.csv                 # one round
    python3 monitor.py devices.csv --every 60      # keep checking every minute
    python3 monitor.py devices.csv --report        # uptime table from history
"""
from __future__ import annotations

import argparse
import csv
import html
import platform
import shutil
import socket
import sqlite3
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path


@dataclass
class Device:
    name: str
    host: str
    kind: str = "other"
    port: int | None = None  # None = ping
    location: str = ""


@dataclass
class Check:
    device: Device
    up: bool
    latency_ms: float | None
    at: datetime


def load_devices(path: str | Path) -> list[Device]:
    out = []
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if not row.get("name") or row["name"].startswith("#"):
                continue
            port = (row.get("port") or "").strip()
            out.append(Device(row["name"].strip(), row["host"].strip(), (row.get("type") or "other").strip(),
                              int(port) if port else None, (row.get("location") or "").strip()))
    return out


def tcp_check(host: str, port: int, timeout: float) -> float | None:
    start = time.perf_counter()
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return (time.perf_counter() - start) * 1000
    except OSError:
        return None


def ping_check(host: str, timeout: float) -> float | None:
    if not shutil.which("ping"):
        return None
    if platform.system() == "Windows":
        cmd = ["ping", "-n", "1", "-w", str(int(timeout * 1000)), host]
    else:
        cmd = ["ping", "-c", "1", "-W", str(max(1, round(timeout))), host]
    start = time.perf_counter()
    try:
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=timeout + 2)
    except subprocess.TimeoutExpired:
        return None
    return (time.perf_counter() - start) * 1000 if res.returncode == 0 else None


def check(device: Device, timeout: float = 1.0) -> Check:
    if device.port:
        latency = tcp_check(device.host, device.port, timeout)
    else:
        latency = ping_check(device.host, timeout)
    return Check(device, latency is not None, latency, datetime.now())


def check_all(devices: list[Device], timeout: float = 1.0) -> list[Check]:
    with ThreadPoolExecutor(max_workers=min(64, len(devices) or 1)) as pool:
        return list(pool.map(lambda d: check(d, timeout), devices))


class History:
    def __init__(self, path: str | Path):
        self.db = sqlite3.connect(path)
        self.db.execute("""CREATE TABLE IF NOT EXISTS checks (
            name TEXT, host TEXT, up INTEGER, latency_ms REAL, at TEXT)""")
        self.db.execute("CREATE INDEX IF NOT EXISTS idx_checks ON checks(name, at)")

    def save(self, checks: list[Check]) -> None:
        self.db.executemany("INSERT INTO checks VALUES (?,?,?,?,?)",
                            [(c.device.name, c.device.host, int(c.up), c.latency_ms, c.at.isoformat())
                             for c in checks])
        self.db.commit()

    def uptime(self, since: datetime) -> dict[str, tuple[float, int]]:
        """name -> (uptime %, number of checks)"""
        rows = self.db.execute("""SELECT name, AVG(up) * 100, COUNT(*) FROM checks
                                  WHERE at >= ? GROUP BY name""", (since.isoformat(),))
        return {name: (pct, n) for name, pct, n in rows}

    def last_change(self, name: str, up: bool) -> str | None:
        """When the device last switched into its current state."""
        row = self.db.execute("SELECT MAX(at) FROM checks WHERE name = ? AND up = ?", (name, int(not up))).fetchone()
        if not row[0]:
            return None
        row = self.db.execute("SELECT MIN(at) FROM checks WHERE name = ? AND at > ?", (name, row[0])).fetchone()
        return row[0]


def render_dashboard(checks: list[Check], uptime: dict[str, tuple[float, int]], history: History | None = None) -> str:
    down = [c for c in checks if not c.up]
    cards = []
    for c in sorted(checks, key=lambda c: (c.up, c.device.kind, c.device.name)):
        pct = uptime.get(c.device.name, (100.0 if c.up else 0.0, 0))[0]
        since = history.last_change(c.device.name, c.up) if history else None
        since_txt = f"since {since[:16].replace('T', ' ')}" if since else ""
        lat = f"{c.latency_ms:.0f} ms" if c.latency_ms is not None else "no reply"
        target = f"{c.device.host}:{c.device.port}" if c.device.port else c.device.host
        cards.append(f"""
      <div class="card {'up' if c.up else 'down'}">
        <div class="top"><span class="dot"></span><b>{html.escape(c.device.name)}</b><span class="kind">{html.escape(c.device.kind)}</span></div>
        <div class="meta">{html.escape(target)} · {html.escape(c.device.location)}</div>
        <div class="row"><span>{lat}</span><span>{pct:.1f}% / 24h</span></div>
        <div class="bar"><i style="width:{pct:.1f}%"></i></div>
        <div class="since">{since_txt}</div>
      </div>""")
    summary = "All systems up" if not down else f"{len(down)} device(s) down: " + ", ".join(
        html.escape(c.device.name) for c in down)
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="60">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Network status</title>
<style>
  body {{ font-family: system-ui, sans-serif; background:#0d1321; color:#e6edf3; margin:0; padding:24px; }}
  h1 {{ margin:0 0 4px; font-size:22px; }}
  .sub {{ color:#8b98a9; margin-bottom:18px; }}
  .banner {{ padding:12px 16px; border-radius:10px; margin-bottom:20px; font-weight:600;
             background:{'#12361f' if not down else '#4a1418'}; color:{'#5ee38a' if not down else '#ff8a8a'}; }}
  .grid {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:14px; }}
  .card {{ background:#161e2e; border:1px solid #243049; border-radius:12px; padding:14px; }}
  .card.down {{ border-color:#a33; }}
  .top {{ display:flex; align-items:center; gap:8px; }}
  .dot {{ width:10px; height:10px; border-radius:50%; background:#3ddc84; box-shadow:0 0 8px #3ddc84; }}
  .down .dot {{ background:#ff5252; box-shadow:0 0 8px #ff5252; }}
  .kind {{ margin-left:auto; font-size:11px; color:#8b98a9; text-transform:uppercase; }}
  .meta, .since {{ color:#8b98a9; font-size:12px; margin-top:4px; }}
  .row {{ display:flex; justify-content:space-between; margin-top:10px; font-size:13px; }}
  .bar {{ height:6px; background:#243049; border-radius:3px; margin-top:6px; overflow:hidden; }}
  .bar i {{ display:block; height:100%; background:#3ddc84; }}
  .down .bar i {{ background:#ff5252; }}
</style></head>
<body>
  <h1>Network status</h1>
  <div class="sub">{len(checks) - len(down)}/{len(checks)} up · checked {datetime.now():%Y-%m-%d %H:%M:%S}</div>
  <div class="banner">{summary}</div>
  <div class="grid">{''.join(cards)}
  </div>
</body></html>
"""


def run_round(devices, history: History, out: Path, timeout: float) -> list[Check]:
    checks = check_all(devices, timeout)
    history.save(checks)
    uptime = history.uptime(datetime.now() - timedelta(hours=24))
    out.write_text(render_dashboard(checks, uptime, history), encoding="utf-8")
    stamp = datetime.now().strftime("%H:%M:%S")
    for c in checks:
        if not c.up:
            print(f"[{stamp}] DOWN  {c.device.name} ({c.device.host})")
    print(f"[{stamp}] {sum(c.up for c in checks)}/{len(checks)} up -> {out}")
    return checks


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Network device uptime monitor")
    ap.add_argument("devices", help="CSV with name,host,type,port,location")
    ap.add_argument("--every", type=int, help="repeat every N seconds")
    ap.add_argument("--timeout", type=float, default=1.0)
    ap.add_argument("--db", default="history.db")
    ap.add_argument("--out", default="dashboard.html")
    ap.add_argument("--report", action="store_true", help="print uptime for the last 24h, 7d and 30d")
    args = ap.parse_args(argv)

    devices = load_devices(args.devices)
    history = History(args.db)

    if args.report:
        now = datetime.now()
        periods = {"24h": history.uptime(now - timedelta(days=1)), "7d": history.uptime(now - timedelta(days=7)),
                   "30d": history.uptime(now - timedelta(days=30))}
        print(f"{'Device':<24}{'24h':>9}{'7d':>9}{'30d':>9}")
        for d in devices:
            cells = [f"{periods[p][d.name][0]:.2f}%" if d.name in periods[p] else "-" for p in periods]
            print(f"{d.name:<24}" + "".join(f"{c:>9}" for c in cells))
        return 0

    out = Path(args.out)
    if not args.every:
        checks = run_round(devices, history, out, args.timeout)
        return 0 if all(c.up for c in checks) else 2
    try:
        while True:
            run_round(devices, history, out, args.timeout)
            time.sleep(args.every)
    except KeyboardInterrupt:
        return 0


if __name__ == "__main__":
    sys.exit(main())
