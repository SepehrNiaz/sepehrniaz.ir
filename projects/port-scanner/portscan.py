#!/usr/bin/env python3
"""Multi-threaded TCP port scanner with banner grabbing.

Only scan networks you own or have written permission to test.

Examples:
    python3 portscan.py 192.168.1.10
    python3 portscan.py 192.168.1.0/28 -p 22,80,443,3389 --banner
    python3 portscan.py scanme.nmap.org -p 1-1024 --json report.json
"""
from __future__ import annotations

import argparse
import ipaddress
import json
import socket
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import asdict, dataclass, field

COMMON_PORTS = {
    21: "ftp", 22: "ssh", 23: "telnet", 25: "smtp", 53: "dns", 80: "http",
    110: "pop3", 135: "msrpc", 139: "netbios", 143: "imap", 161: "snmp",
    443: "https", 445: "smb", 554: "rtsp", 993: "imaps", 995: "pop3s",
    1433: "mssql", 3306: "mysql", 3389: "rdp", 5432: "postgres",
    5900: "vnc", 8000: "http-alt", 8080: "http-proxy", 8443: "https-alt",
    9100: "printer", 37777: "dahua-dvr",
}

# Ports worth a second look if they're open on an internal network
RISKY = {
    23: "Telnet sends passwords in clear text, use SSH",
    21: "FTP sends passwords in clear text, use SFTP",
    445: "SMB exposed: make sure SMBv1 is off and it's not reachable from guests",
    3389: "RDP exposed: restrict to VPN / admin VLAN and enable NLA",
    5900: "VNC is often left without a strong password",
    161: "SNMP: change default community strings (public/private)",
    37777: "DVR/NVR management port: never expose it to the guest or public network",
}


@dataclass
class PortResult:
    port: int
    service: str
    banner: str = ""
    warning: str = ""


@dataclass
class HostResult:
    host: str
    open_ports: list[PortResult] = field(default_factory=list)


def parse_ports(spec: str) -> list[int]:
    """'22,80,8000-8010' -> [22, 80, 8000, ..., 8010]"""
    ports: set[int] = set()
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            a, b = (int(x) for x in part.split("-", 1))
            if a > b:
                a, b = b, a
            ports.update(range(a, b + 1))
        else:
            ports.add(int(part))
    bad = [p for p in ports if not 1 <= p <= 65535]
    if bad:
        raise ValueError(f"invalid port(s): {bad[:5]}")
    return sorted(ports)


def expand_targets(target: str) -> list[str]:
    try:
        net = ipaddress.ip_network(target, strict=False)
    except ValueError:
        return [target]  # hostname
    if net.num_addresses == 1:
        return [str(net.network_address)]
    if net.num_addresses > 1024:
        raise ValueError("refusing to scan more than 1024 addresses at once")
    return [str(h) for h in net.hosts()]


def grab_banner(sock: socket.socket, port: int) -> str:
    try:
        if port in (80, 8000, 8080):
            sock.sendall(b"HEAD / HTTP/1.0\r\n\r\n")
        data = sock.recv(256)
    except OSError:
        return ""
    text = data.decode("utf-8", "replace").strip()
    for line in text.splitlines():
        if line.lower().startswith("server:"):
            return line
    return text.splitlines()[0][:100] if text else ""


def scan_port(host: str, port: int, timeout: float, banner: bool) -> PortResult | None:
    try:
        with socket.create_connection((host, port), timeout=timeout) as sock:
            text = grab_banner(sock, port) if banner else ""
    except OSError:
        return None
    return PortResult(port, COMMON_PORTS.get(port, "unknown"), text, RISKY.get(port, ""))


def scan(targets: list[str], ports: list[int], timeout=0.5, workers=200, banner=False) -> list[HostResult]:
    jobs = [(h, p) for h in targets for p in ports]
    found: dict[str, list[PortResult]] = {h: [] for h in targets}
    with ThreadPoolExecutor(max_workers=workers) as pool:
        for (host, _), res in zip(jobs, pool.map(lambda j: scan_port(j[0], j[1], timeout, banner), jobs)):
            if res:
                found[host].append(res)
    return [HostResult(h, sorted(r, key=lambda x: x.port)) for h, r in found.items()]


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="TCP port scanner (authorised use only)")
    ap.add_argument("target", help="IP, hostname or CIDR range")
    ap.add_argument("-p", "--ports", default=",".join(map(str, COMMON_PORTS)),
                    help="ports, e.g. 22,80,1-1024 (default: common ports)")
    ap.add_argument("-t", "--timeout", type=float, default=0.5)
    ap.add_argument("-w", "--workers", type=int, default=200)
    ap.add_argument("--banner", action="store_true", help="try to read service banners")
    ap.add_argument("--json", metavar="FILE", help="also save results as JSON")
    args = ap.parse_args(argv)

    try:
        ports = parse_ports(args.ports)
        targets = expand_targets(args.target)
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1

    start = time.time()
    print(f"Scanning {len(targets)} host(s), {len(ports)} port(s)...")
    results = scan(targets, ports, args.timeout, args.workers, args.banner)
    for host in results:
        if not host.open_ports:
            continue
        print(f"\n{host.host}")
        for r in host.open_ports:
            line = f"  {r.port:>5}/tcp  open  {r.service:<12} {r.banner}"
            print(line.rstrip())
            if r.warning:
                print(f"         ! {r.warning}")
    up = sum(1 for h in results if h.open_ports)
    print(f"\nDone in {time.time() - start:.1f}s: {up} host(s) with open ports.")

    if args.json:
        with open(args.json, "w") as f:
            json.dump([asdict(h) for h in results], f, indent=2)
        print(f"Saved {args.json}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
