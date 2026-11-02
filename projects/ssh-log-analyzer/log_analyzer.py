#!/usr/bin/env python3
"""Find SSH brute-force attempts in Linux auth logs.

Reads /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL) format,
counts failed logins per IP, spots bursts (many failures in a short window),
flags IPs that eventually logged in successfully, and can print
firewall rules to block the attackers.

Examples:
    python3 log_analyzer.py sample/auth.log
    python3 log_analyzer.py /var/log/auth.log --threshold 5 --window 60 --block iptables
    journalctl -u ssh --no-pager | python3 log_analyzer.py -
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timedelta

LINE_RE = re.compile(r"^(?P<ts>\w{3}\s+\d{1,2} \d{2}:\d{2}:\d{2}) \S+ sshd\[\d+\]: (?P<msg>.*)$")
ISO_RE = re.compile(r"^(?P<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\S* \S+ sshd\[\d+\]: (?P<msg>.*)$")

FAILED_RE = re.compile(r"Failed (?:password|publickey) for (?P<invalid>invalid user )?(?P<user>\S+) from (?P<ip>[\d.:a-fA-F]+)")
INVALID_RE = re.compile(r"Invalid user (?P<user>\S*) from (?P<ip>[\d.:a-fA-F]+)")
ACCEPTED_RE = re.compile(r"Accepted (?:password|publickey) for (?P<user>\S+) from (?P<ip>[\d.:a-fA-F]+)")


@dataclass
class IpStats:
    ip: str
    failures: list[datetime] = field(default_factory=list)
    users: Counter = field(default_factory=Counter)
    invalid_names: set = field(default_factory=set)
    successes: list[tuple[datetime, str]] = field(default_factory=list)

    def max_burst(self, window: timedelta) -> int:
        """Largest number of failures inside any sliding window."""
        times = sorted(self.failures)
        best = lo = 0
        for hi, t in enumerate(times):
            while t - times[lo] > window:
                lo += 1
            best = max(best, hi - lo + 1)
        return best

    @property
    def invalid_users(self) -> int:
        """Distinct usernames tried that don't exist on the server."""
        return len(self.invalid_names)

    def compromised(self, min_failures: int = 5) -> bool:
        """Logged in after a run of failures: possibly a guessed password.

        A single typo before a good login is normal, so it takes at least
        `min_failures` failures before the success to count.
        """
        if len(self.failures) < min_failures or not self.successes:
            return False
        first_fail = min(self.failures)
        return any(t >= first_fail for t, _ in self.successes)


def parse_ts(raw: str, year: int) -> datetime:
    if "T" in raw:
        return datetime.fromisoformat(raw)
    return datetime.strptime(f"{year} {' '.join(raw.split())}", "%Y %b %d %H:%M:%S")


def analyze(lines, year: int | None = None) -> dict[str, IpStats]:
    year = year or datetime.now().year
    stats: dict[str, IpStats] = {}

    def get(ip):
        return stats.setdefault(ip, IpStats(ip))

    for line in lines:
        m = LINE_RE.match(line) or ISO_RE.match(line)
        if not m:
            continue
        ts, msg = parse_ts(m["ts"], year), m["msg"]
        if f := FAILED_RE.search(msg):
            s = get(f["ip"])
            s.failures.append(ts)
            s.users[f["user"]] += 1
            if f["invalid"]:
                s.invalid_names.add(f["user"])
        elif i := INVALID_RE.search(msg):
            get(i["ip"]).invalid_names.add(i["user"])
        elif a := ACCEPTED_RE.search(msg):
            get(a["ip"]).successes.append((ts, a["user"]))
    return stats


def suspicious(stats: dict[str, IpStats], threshold: int, window: timedelta) -> list[IpStats]:
    out = [s for s in stats.values() if s.max_burst(window) >= threshold or s.compromised(threshold)]
    return sorted(out, key=lambda s: (not s.compromised(threshold), -len(s.failures)))


def block_rules(ips: list[str], kind: str) -> list[str]:
    if kind == "iptables":
        return [f"iptables -A INPUT -s {ip} -p tcp --dport 22 -j DROP" for ip in ips]
    if kind == "ufw":
        return [f"ufw deny from {ip} to any port 22 proto tcp" for ip in ips]
    if kind == "cisco":
        rules = ["ip access-list extended BLOCK-SSH-ATTACKERS"]
        rules += [f" deny tcp host {ip} any eq 22" for ip in ips]
        rules.append(" permit ip any any")
        return rules
    raise ValueError(kind)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="SSH brute-force detector for auth logs")
    ap.add_argument("logfile", help="path to auth.log / secure, or - for stdin")
    ap.add_argument("--threshold", type=int, default=5, help="failures in the window to flag an IP (default 5)")
    ap.add_argument("--window", type=int, default=300, help="window in seconds (default 300)")
    ap.add_argument("--year", type=int, help="year for syslog timestamps (default: this year)")
    ap.add_argument("--block", choices=["iptables", "ufw", "cisco"], help="print rules to block flagged IPs")
    ap.add_argument("--json", action="store_true", help="output JSON")
    args = ap.parse_args(argv)

    fh = sys.stdin if args.logfile == "-" else open(args.logfile, encoding="utf-8", errors="replace")
    with fh:
        stats = analyze(fh, args.year)
    window = timedelta(seconds=args.window)
    flagged = suspicious(stats, args.threshold, window)

    if args.json:
        print(json.dumps([{
            "ip": s.ip,
            "failures": len(s.failures),
            "max_burst": s.max_burst(window),
            "invalid_users": s.invalid_users,
            "top_users": s.users.most_common(5),
            "first_seen": min(s.failures).isoformat() if s.failures else None,
            "last_seen": max(s.failures).isoformat() if s.failures else None,
            "logged_in_after_failures": s.compromised(args.threshold),
        } for s in flagged], indent=2))
        return 0

    total_fail = sum(len(s.failures) for s in stats.values())
    total_ok = sum(len(s.successes) for s in stats.values())
    print(f"Failed logins: {total_fail}   Successful logins: {total_ok}   Source IPs: {len(stats)}")
    print(f"Flagged ({args.threshold}+ failures within {args.window}s, or a login after them): {len(flagged)}\n")

    if flagged:
        print(f"{'IP':<18}{'Fails':>6}{'Burst':>7}{'Invalid':>9}  Top usernames")
        for s in flagged:
            users = ", ".join(u for u, _ in s.users.most_common(4))
            print(f"{s.ip:<18}{len(s.failures):>6}{s.max_burst(window):>7}{s.invalid_users:>9}  {users}")
        for s in flagged:
            if s.compromised(args.threshold):
                for t, user in s.successes:
                    print(f"\n!! {s.ip} logged in as '{user}' at {t} after {len(s.failures)} failures."
                          " Check this account now and rotate its password.")

    hourly = Counter(t.hour for s in stats.values() for t in s.failures)
    if hourly:
        print("\nFailures by hour:")
        peak = max(hourly.values())
        for h in range(24):
            if hourly[h]:
                print(f"  {h:02d}:00 {'#' * max(1, round(30 * hourly[h] / peak))} {hourly[h]}")

    if args.block and flagged:
        print(f"\n# {args.block} rules")
        print("\n".join(block_rules([s.ip for s in flagged], args.block)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
