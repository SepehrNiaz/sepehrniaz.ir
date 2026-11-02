#!/usr/bin/env python3
"""A small IT helpdesk ticket tracker for one-person IT departments.

Log every job (who asked, which department, what area, how urgent), close it
with a note, and get monthly reports showing where your time goes.

Examples:
    python3 helpdesk.py add "Printer not printing" --dept Reception --area printer --priority high
    python3 helpdesk.py list
    python3 helpdesk.py close 12 "Replaced fuser, test page OK"
    python3 helpdesk.py report --month 2026-10
    python3 helpdesk.py report --html report.html
    python3 helpdesk.py demo        # fill a throwaway database with sample tickets
"""
from __future__ import annotations

import argparse
import csv
import html
import random
import sqlite3
import sys
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path

AREAS = ["network", "wifi", "pc", "printer", "camera", "phone", "pms", "email", "account", "pos", "tv", "other"]
PRIORITIES = ["low", "normal", "high", "urgent"]
TARGET_HOURS = {"urgent": 1, "high": 4, "normal": 24, "low": 72}  # SLA: time to resolve

SCHEMA = """
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    dept TEXT NOT NULL DEFAULT '',
    area TEXT NOT NULL DEFAULT 'other',
    priority TEXT NOT NULL DEFAULT 'normal',
    requester TEXT NOT NULL DEFAULT '',
    opened TEXT NOT NULL,
    closed TEXT,
    resolution TEXT
);
"""


class Desk:
    def __init__(self, path: str | Path = "helpdesk.db"):
        self.db = sqlite3.connect(path)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(SCHEMA)

    def add(self, title, dept="", area="other", priority="normal", requester="", opened: datetime | None = None) -> int:
        if area not in AREAS:
            raise ValueError(f"area must be one of: {', '.join(AREAS)}")
        if priority not in PRIORITIES:
            raise ValueError(f"priority must be one of: {', '.join(PRIORITIES)}")
        opened = opened or datetime.now()
        cur = self.db.execute(
            "INSERT INTO tickets (title, dept, area, priority, requester, opened) VALUES (?,?,?,?,?,?)",
            (title, dept, area, priority, requester, opened.isoformat(timespec="minutes")))
        self.db.commit()
        return cur.lastrowid

    def close(self, ticket_id: int, resolution: str, closed: datetime | None = None) -> None:
        cur = self.db.execute("UPDATE tickets SET closed = ?, resolution = ? WHERE id = ? AND closed IS NULL",
                              ((closed or datetime.now()).isoformat(timespec="minutes"), resolution, ticket_id))
        self.db.commit()
        if cur.rowcount == 0:
            raise ValueError(f"ticket #{ticket_id} doesn't exist or is already closed")

    def tickets(self, open_only=False, month: str | None = None) -> list[sqlite3.Row]:
        q, args = "SELECT * FROM tickets WHERE 1=1", []
        if open_only:
            q += " AND closed IS NULL"
        if month:
            q += " AND substr(opened, 1, 7) = ?"
            args.append(month)
        q += " ORDER BY CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END, opened"
        return self.db.execute(q, args).fetchall()


def hours_to_close(t) -> float | None:
    if not t["closed"]:
        return None
    return (datetime.fromisoformat(t["closed"]) - datetime.fromisoformat(t["opened"])).total_seconds() / 3600


def summarize(rows) -> dict:
    closed = [t for t in rows if t["closed"]]
    durations = [hours_to_close(t) for t in closed]
    within = sum(1 for t, h in zip(closed, durations) if h <= TARGET_HOURS[t["priority"]])
    return {
        "total": len(rows),
        "closed": len(closed),
        "open": len(rows) - len(closed),
        "avg_hours": sum(durations) / len(durations) if durations else 0.0,
        "sla_pct": 100 * within / len(closed) if closed else 0.0,
        "by_area": Counter(t["area"] for t in rows).most_common(),
        "by_dept": Counter(t["dept"] or "-" for t in rows).most_common(),
        "by_month": sorted(Counter(t["opened"][:7] for t in rows).items()),
        "by_priority": Counter(t["priority"] for t in rows),
    }


def bar(n: int, peak: int, width=28) -> str:
    return "█" * max(1, round(width * n / peak)) if n else ""


def print_report(s: dict, title: str) -> None:
    print(title)
    print("=" * len(title))
    print(f"Tickets: {s['total']}  closed: {s['closed']}  open: {s['open']}")
    print(f"Average time to resolve: {s['avg_hours']:.1f} h   Resolved within target: {s['sla_pct']:.0f}%")
    for label, key in (("By area", "by_area"), ("By department", "by_dept"), ("By month", "by_month")):
        items = s[key]
        if not items:
            continue
        peak = max(n for _, n in items)
        print(f"\n{label}:")
        for name, n in items:
            print(f"  {name:<14}{n:>4}  {bar(n, peak)}")


def html_report(s: dict, title: str) -> str:
    def bars(items, color):
        if not items:
            return ""
        peak = max(n for _, n in items)
        return "".join(
            f'<div class="r"><span>{html.escape(str(k))}</span><div class="b"><i style="width:{100 * n / peak:.0f}%;'
            f'background:{color}"></i></div><b>{n}</b></div>' for k, n in items)
    kpis = [("Tickets", s["total"]), ("Open", s["open"]), ("Avg. hours to resolve", f"{s['avg_hours']:.1f}"),
            ("Within target", f"{s['sla_pct']:.0f}%")]
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>{html.escape(title)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{{font-family:system-ui,sans-serif;margin:0;padding:28px;background:#f5f7fb;color:#1c2333}}
h1{{margin:0 0 18px;font-size:22px}} h2{{font-size:15px;margin:0 0 12px;color:#4a5670}}
.k{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}}
.k div,.c{{background:#fff;border-radius:12px;padding:14px 16px;box-shadow:0 1px 3px #0001}}
.k b{{display:block;font-size:26px}} .k span{{color:#6b7790;font-size:12px}}
.g{{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}}
.r{{display:grid;grid-template-columns:90px 1fr 32px;align-items:center;gap:8px;font-size:13px;margin:5px 0}}
.b{{background:#eef1f7;border-radius:4px;height:10px;overflow:hidden}} .b i{{display:block;height:100%}}
.r b{{text-align:right}}
@media(max-width:800px){{.k,.g{{grid-template-columns:1fr 1fr}}}}
</style></head><body>
<h1>{html.escape(title)}</h1>
<div class="k">{''.join(f'<div><b>{v}</b><span>{k}</span></div>' for k, v in kpis)}</div>
<div class="g">
<div class="c"><h2>By area</h2>{bars(s['by_area'], '#3b6fe0')}</div>
<div class="c"><h2>By department</h2>{bars(s['by_dept'], '#13a37e')}</div>
<div class="c"><h2>By month</h2>{bars(s['by_month'], '#e08a3b')}</div>
</div></body></html>
"""


def seed_demo(desk: Desk, n=179, start=datetime(2026, 1, 1), months=10, rng=None) -> None:
    """Sample data shaped like a real year of hotel IT work."""
    rng = rng or random.Random(42)
    jobs = {
        "printer": ["Printer offline", "Paper jam", "Toner replacement", "Scan to email not working"],
        "pc": ["PC very slow", "Windows update stuck", "New staff PC setup", "Blue screen on startup"],
        "network": ["No internet in office", "Switch port down", "Cable replacement", "IP conflict"],
        "wifi": ["Guest Wi-Fi slow on 3rd floor", "Access point offline", "Guest can't connect"],
        "camera": ["Camera offline", "NVR storage full", "Playback request for security"],
        "pms": ["PMS login error", "Room status not syncing", "Key card encoder not working"],
        "phone": ["Room phone dead", "Extension change", "Voicemail reset"],
        "email": ["Mailbox full", "Outlook not syncing", "Spam emails"],
        "account": ["Password reset", "New user account", "Disable leaver account"],
        "pos": ["Restaurant POS frozen", "Receipt printer not printing"],
        "tv": ["Room TV no signal", "IPTV channel list"],
        "other": ["Projector for conference room", "UPS beeping"],
    }
    weights = {"printer": 22, "pc": 20, "network": 14, "wifi": 12, "camera": 9, "pms": 8,
               "phone": 6, "email": 5, "account": 6, "pos": 4, "tv": 4, "other": 3}
    depts = ["Reception", "Restaurant", "Housekeeping", "Accounting", "Management", "Security", "Kitchen", "Sales"]
    span = round(months * 30.4)  # days
    for _ in range(n):
        area = rng.choices(list(weights), list(weights.values()))[0]
        prio = rng.choices(PRIORITIES, [15, 55, 22, 8])[0]
        opened = start + timedelta(days=rng.randrange(span), hours=rng.randint(8, 21), minutes=rng.choice([0, 15, 30, 45]))
        tid = desk.add(rng.choice(jobs[area]), rng.choice(depts), area, prio, opened=opened)
        if rng.random() < 0.97:
            hours = rng.uniform(0.2, TARGET_HOURS[prio] * (1.6 if rng.random() < 0.15 else 0.9))
            desk.close(tid, "Fixed", opened + timedelta(hours=hours))


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="IT helpdesk ticket tracker")
    ap.add_argument("--db", default="helpdesk.db")
    sub = ap.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("add", help="open a ticket")
    a.add_argument("title")
    a.add_argument("--dept", default="")
    a.add_argument("--area", default="other", choices=AREAS)
    a.add_argument("--priority", default="normal", choices=PRIORITIES)
    a.add_argument("--by", default="", help="who asked")

    c = sub.add_parser("close", help="close a ticket")
    c.add_argument("id", type=int)
    c.add_argument("resolution")

    ls = sub.add_parser("list", help="list tickets (open ones by default)")
    ls.add_argument("--all", action="store_true")

    r = sub.add_parser("report", help="statistics")
    r.add_argument("--month", help="YYYY-MM")
    r.add_argument("--html", metavar="FILE")
    r.add_argument("--csv", metavar="FILE")

    sub.add_parser("demo", help="fill the database with sample tickets")
    args = ap.parse_args(argv)

    desk = Desk(args.db)
    try:
        if args.cmd == "add":
            tid = desk.add(args.title, args.dept, args.area, args.priority, args.by)
            print(f"Opened ticket #{tid}")
        elif args.cmd == "close":
            desk.close(args.id, args.resolution)
            print(f"Closed ticket #{args.id}")
        elif args.cmd == "list":
            rows = desk.tickets(open_only=not args.all)
            if not rows:
                print("No open tickets 🎉" if not args.all else "No tickets yet.")
            for t in rows:
                state = "open" if not t["closed"] else "done"
                print(f"#{t['id']:<4} {t['priority']:<7} {state:<5} {t['opened'][:16]}  "
                      f"{t['area']:<8} {t['dept'] or '-':<13} {t['title']}")
        elif args.cmd == "report":
            rows = desk.tickets(month=args.month)
            title = f"IT helpdesk report {args.month or '(all time)'}"
            s = summarize(rows)
            print_report(s, title)
            if args.html:
                Path(args.html).write_text(html_report(s, title), encoding="utf-8")
                print(f"\nSaved {args.html}")
            if args.csv:
                with open(args.csv, "w", newline="", encoding="utf-8") as f:
                    w = csv.writer(f)
                    w.writerow(rows[0].keys() if rows else ["id"])
                    w.writerows(tuple(t) for t in rows)
                print(f"Saved {args.csv}")
        elif args.cmd == "demo":
            seed_demo(desk)
            print(f"Added sample tickets to {args.db}. Try: python3 helpdesk.py --db {args.db} report")
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
