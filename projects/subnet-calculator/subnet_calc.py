#!/usr/bin/env python3
"""IPv4 subnet and VLSM calculator.

Examples:
    python3 subnet_calc.py info 192.168.10.37/26
    python3 subnet_calc.py split 10.0.0.0/24 --prefix 27
    python3 subnet_calc.py vlsm 172.16.0.0/22 Reception=120 Rooms=300 Cameras=60 Office=25
"""
from __future__ import annotations

import argparse
import ipaddress
import math
import sys
from dataclasses import dataclass


@dataclass
class SubnetInfo:
    network: ipaddress.IPv4Network

    @property
    def netmask(self) -> str:
        return str(self.network.netmask)

    @property
    def wildcard(self) -> str:
        return str(self.network.hostmask)

    @property
    def broadcast(self) -> str:
        return str(self.network.broadcast_address)

    @property
    def usable_hosts(self) -> int:
        size = self.network.num_addresses
        if self.network.prefixlen == 32:
            return 1
        if self.network.prefixlen == 31:  # RFC 3021 point-to-point
            return 2
        return size - 2

    @property
    def first_host(self) -> str:
        if self.network.prefixlen >= 31:
            return str(self.network.network_address)
        return str(self.network.network_address + 1)

    @property
    def last_host(self) -> str:
        if self.network.prefixlen >= 31:
            return str(self.network.broadcast_address)
        return str(self.network.broadcast_address - 1)

    @property
    def ip_class(self) -> str:
        first = int(str(self.network.network_address).split(".")[0])
        if first < 128:
            return "A"
        if first < 192:
            return "B"
        if first < 224:
            return "C"
        if first < 240:
            return "D (multicast)"
        return "E (reserved)"

    def as_dict(self) -> dict:
        return {
            "Network": f"{self.network.network_address}/{self.network.prefixlen}",
            "Netmask": self.netmask,
            "Wildcard": self.wildcard,
            "Broadcast": self.broadcast,
            "First host": self.first_host,
            "Last host": self.last_host,
            "Usable hosts": self.usable_hosts,
            "Class": self.ip_class,
            "Private": "yes" if self.network.is_private else "no",
        }


def info(cidr: str) -> SubnetInfo:
    return SubnetInfo(ipaddress.IPv4Network(cidr, strict=False))


def split(cidr: str, new_prefix: int) -> list[ipaddress.IPv4Network]:
    net = ipaddress.IPv4Network(cidr, strict=False)
    if new_prefix < net.prefixlen or new_prefix > 32:
        raise ValueError(f"prefix must be between /{net.prefixlen} and /32")
    return list(net.subnets(new_prefix=new_prefix))


def prefix_for_hosts(hosts: int) -> int:
    """Smallest prefix whose subnet has room for `hosts` usable addresses."""
    if hosts < 1:
        raise ValueError("a subnet needs at least one host")
    if hosts == 1:
        return 32
    if hosts == 2:
        return 30
    bits = math.ceil(math.log2(hosts + 2))
    return 32 - bits


def vlsm(cidr: str, needs: dict[str, int]) -> list[tuple[str, int, ipaddress.IPv4Network]]:
    """Allocate subnets largest-first so they pack without gaps."""
    base = ipaddress.IPv4Network(cidr, strict=False)
    cursor = int(base.network_address)
    end = int(base.broadcast_address)
    plan = []
    for name, hosts in sorted(needs.items(), key=lambda kv: -kv[1]):
        prefix = prefix_for_hosts(hosts)
        size = 2 ** (32 - prefix)
        # align the cursor to the block size
        if cursor % size:
            cursor += size - cursor % size
        if cursor + size - 1 > end:
            raise ValueError(f"{base} is too small: no room left for '{name}' ({hosts} hosts)")
        subnet = ipaddress.IPv4Network(f"{ipaddress.IPv4Address(cursor)}/{prefix}")
        plan.append((name, hosts, subnet))
        cursor += size
    return plan


def _print_table(rows: list[list[str]], headers: list[str]) -> None:
    widths = [max(len(str(x)) for x in col) for col in zip(headers, *rows)]
    line = "  ".join(h.ljust(w) for h, w in zip(headers, widths)).rstrip()
    print(line)
    print("-" * len(line))
    for row in rows:
        print("  ".join(str(c).ljust(w) for c, w in zip(row, widths)).rstrip())


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="IPv4 subnet & VLSM calculator")
    sub = p.add_subparsers(dest="cmd", required=True)

    p_info = sub.add_parser("info", help="details about one network")
    p_info.add_argument("cidr")

    p_split = sub.add_parser("split", help="split a network into equal subnets")
    p_split.add_argument("cidr")
    p_split.add_argument("--prefix", type=int, required=True)

    p_vlsm = sub.add_parser("vlsm", help="plan variable-length subnets: NAME=HOSTS ...")
    p_vlsm.add_argument("cidr")
    p_vlsm.add_argument("needs", nargs="+")

    args = p.parse_args(argv)
    try:
        if args.cmd == "info":
            for k, v in info(args.cidr).as_dict().items():
                print(f"{k:<13}{v}")
        elif args.cmd == "split":
            rows = []
            for n in split(args.cidr, args.prefix):
                s = SubnetInfo(n)
                rows.append([str(n), s.first_host, s.last_host, s.broadcast, s.usable_hosts])
            _print_table(rows, ["Subnet", "First", "Last", "Broadcast", "Hosts"])
        else:
            needs = {}
            for item in args.needs:
                name, _, count = item.partition("=")
                needs[name] = int(count)
            rows = []
            for name, hosts, n in vlsm(args.cidr, needs):
                s = SubnetInfo(n)
                rows.append([name, hosts, str(n), s.netmask, f"{s.first_host} - {s.last_host}", s.usable_hosts])
            _print_table(rows, ["Name", "Need", "Subnet", "Mask", "Range", "Fits"])
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
