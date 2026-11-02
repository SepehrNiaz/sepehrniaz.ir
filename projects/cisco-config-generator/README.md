# Cisco Switch Config Generator

**تولیدکننده‌ی کانفیگ سوئیچ سیسکو** — طراحی سوئیچ را یک بار در فایل JSON بنویسید و کانفیگ کامل و امن IOS (VLAN، ترانک، Port Security، DHCP Snooping، SSH) تحویل بگیرید. قبل از تولید، خطاهای طراحی را هم پیدا می‌کند.

Configuring a dozen access switches by hand leads to typos and forgotten hardening. This tool takes a short JSON description of a switch and writes the full Cisco IOS configuration, with security best practices built in. It checks the design first and refuses to produce a config with mistakes in it.

## What the generated config includes

| Area | What you get |
|---|---|
| VLANs | Named VLANs, plus a black-hole VLAN for unused ports |
| Access ports | `mode access`, `nonegotiate` (no DTP), PortFast, optional voice VLAN |
| Port security | Max MACs, sticky learning, violation mode per port group |
| Trunks | Explicit allowed VLAN list, dedicated native VLAN, DHCP snooping trust |
| Layer 2 security | BPDU Guard, DHCP snooping with rate limits, broadcast storm control |
| Unused ports | Shut down, described, parked in the black-hole VLAN |
| Management | SVI, default gateway, NTP, syslog |
| Remote access | SSH v2 only, login rate limiting, VTY ACL limited to the admin subnet, timeouts, HTTP server off |

## Design checks

Before writing anything, it checks for:

- reserved or duplicate VLAN IDs
- a port assigned to two groups
- access, voice or trunk VLANs that aren't defined
- a native VLAN that carries user traffic (VLAN hopping risk)
- a default gateway outside the management subnet

```sh
python3 genconfig.py examples/broken.json --check
```

```
examples/broken.json: 7 problem(s)
  - VLAN 1003 is reserved or out of range
  - Gi1/0/4 used by both 'PCs' and 'Printers'
  - Gi1/0/4-6: access VLAN 50 is not defined
  - Gi1/0/24: trunk allows undefined VLAN 20
  - Gi1/0/24: native VLAN carries user traffic (VLAN hopping risk)
  - management VLAN 99 is not defined
  - gateway 10.0.1.1 is not in management subnet 10.0.0.0/24
```

## Usage

```sh
# print the config
python3 genconfig.py examples/hotel-floor1.json

# write one <hostname>.cfg per switch
python3 genconfig.py examples/*.json --out configs/
```

[`examples/hotel-floor1.json`](examples/hotel-floor1.json) describes a 24-port floor switch in a hotel (staff PCs with IP phones, guest Wi-Fi access points, cameras, an uplink). The generated config is in [`examples/output/SW-FLOOR1.cfg`](examples/output/SW-FLOOR1.cfg).

Port groups look like this:

```json
{ "interfaces": "Gi1/0/11-16", "description": "IP cameras", "vlan": 30,
  "port_security": { "max": 1, "violation": "shutdown" } }
```

> Replace the `CHANGE_ME` passwords and review the output before pasting it into a live switch.

## Tests

```sh
python3 -m unittest discover -s tests
```
