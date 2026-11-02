# Projects

**پروژه‌ها** — ابزارهایی که برای کار روزانه‌ام در شبکه، امنیت و پشتیبانی IT نوشته‌ام. همه با پایتون و بدون نیاز به نصب کتابخانه‌ی اضافه.

Tools I wrote for day-to-day network, security and IT support work. All of them are plain Python 3.9+ with no third-party packages, and each has its own README and tests.

| Project | What it does | Topics |
|---|---|---|
| [Subnet & VLSM Calculator](subnet-calculator/) | Subnet details, equal splits and VLSM address plans | IPv4, CCNA |
| [Port Scanner](port-scanner/) | Multi-threaded TCP scanner with banner grabbing and warnings for risky services | Security audit, sockets |
| [SSH Log Analyzer](ssh-log-analyzer/) | Finds brute-force attacks and suspicious logins in Linux auth logs, prints firewall/ACL rules | Blue team, Linux, iptables |
| [Network Uptime Monitor](network-uptime-monitor/) | Pings/port-checks every device, keeps uptime history, builds a status dashboard | Monitoring, SQLite |
| [Cisco Config Generator](cisco-config-generator/) | Builds hardened Cisco IOS switch configs from JSON and catches design mistakes | Cisco IOS, VLANs, L2 security |
| [IT Helpdesk Tracker](helpdesk-tracker/) | Logs IT tickets and reports where the time goes by area, department and month | IT support, reporting |

## Run all the tests

```sh
for d in */; do (cd "$d" && python3 -m unittest discover -s tests -q) || exit 1; done
```
