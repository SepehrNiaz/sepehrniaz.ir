# Subnet & VLSM Calculator

**ماشین‌حساب زیرشبکه و VLSM** — ابزار خط فرمان برای محاسبه‌ی زیرشبکه‌ها و طراحی آدرس‌دهی شبکه (مطابق مباحث CCNA).

A command-line IPv4 calculator for the subnetting you do in CCNA labs and real network design. Pure Python, no dependencies.

## Features

- `info`: netmask, wildcard mask (for ACLs and OSPF), broadcast, host range, usable hosts, class, private/public
- `split`: break a network into equal subnets
- `vlsm`: give it departments and their host counts, and it packs the smallest fitting subnet for each, largest first, with no wasted gaps
- Handles /31 point-to-point links (RFC 3021) and /32 host routes

## Usage

```sh
python3 subnet_calc.py info 192.168.10.37/26
```

```
Network      192.168.10.0/26
Netmask      255.255.255.192
Wildcard     0.0.0.63
Broadcast    192.168.10.63
First host   192.168.10.1
Last host    192.168.10.62
Usable hosts 62
Class        C
Private      yes
```

Plan addressing for a hotel network:

```sh
python3 subnet_calc.py vlsm 172.16.0.0/22 Reception=120 Rooms=300 Cameras=60 Office=25
```

```
Name       Need  Subnet           Mask             Range                        Fits
------------------------------------------------------------------------------------
Rooms      300   172.16.0.0/23    255.255.254.0    172.16.0.1 - 172.16.1.254    510
Reception  120   172.16.2.0/25    255.255.255.128  172.16.2.1 - 172.16.2.126    126
Cameras    60    172.16.2.128/26  255.255.255.192  172.16.2.129 - 172.16.2.190  62
Office     25    172.16.2.192/27  255.255.255.224  172.16.2.193 - 172.16.2.222  30
```

## Tests

```sh
python3 -m unittest discover -s tests
```
