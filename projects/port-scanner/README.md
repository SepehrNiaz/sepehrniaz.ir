# Port Scanner

**اسکنر پورت** — اسکنر چندنخی TCP با تشخیص سرویس و هشدار برای پورت‌های پرخطر، برای ممیزی امنیتی شبکه‌ی داخلی.

A fast, multi-threaded TCP connect scanner written in pure Python. I use it to audit internal networks: find which devices expose which services, and flag the ones that shouldn't be open (Telnet, SMB, RDP, DVR ports...).

> ⚠️ Only scan networks you own or have written permission to test.

## Features

- Single host, hostname, or a whole CIDR range (`192.168.1.0/24`)
- Port lists and ranges: `-p 22,80,443,8000-8100`
- 200 parallel connections by default (`-w` to tune)
- Banner grabbing (`--banner`): SSH versions, HTTP `Server:` headers, FTP greetings
- Built-in warnings for risky services, with what to do about them
- JSON export for reports (`--json`)

## Usage

```sh
python3 portscan.py 192.168.1.0/28 --banner   # example output below
```

```
Scanning 14 host(s), 26 port(s)...

192.168.1.1
     22/tcp  open  ssh          SSH-2.0-Cisco-1.25
     80/tcp  open  http         Server: lighttpd

192.168.1.8
     23/tcp  open  telnet
         ! Telnet sends passwords in clear text, use SSH
  37777/tcp  open  dahua-dvr
         ! DVR/NVR management port: never expose it to the guest or public network

Done in 1.4s: 2 host(s) with open ports.
```

## How it works

A TCP *connect* scan: for each port it tries a full handshake with `socket.create_connection`. Open ports accept, closed ones refuse, filtered ones time out. It needs no root privileges, unlike a SYN scan, but is easier to spot in logs.

## Tests

```sh
python3 -m unittest discover -s tests
```

The tests start a fake SSH server on localhost and check that the scanner finds it and reads its banner.
