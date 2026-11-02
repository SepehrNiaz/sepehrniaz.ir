# SSH Log Analyzer

**تحلیل‌گر لاگ SSH** — تشخیص حملات Brute-force در لاگ‌های لینوکس، پیدا کردن ورودهای مشکوک و تولید قوانین فایروال برای مسدود کردن مهاجم‌ها.

Reads Linux SSH logs (`/var/log/auth.log`, `/var/log/secure` or `journalctl` output) and answers the questions you have after a night of alerts:

- Which IPs are brute-forcing the server, and how fast?
- Which usernames are they guessing? Do those accounts even exist?
- **Did any of them get in?** (a successful login after a run of failures)
- When do the attacks happen?

Then it prints ready-to-paste rules to block the attackers in **iptables**, **ufw** or a **Cisco extended ACL**.

## Usage

```sh
python3 log_analyzer.py sample/auth.log --year 2026 --block cisco
```

```
Failed logins: 69   Successful logins: 9   Source IPs: 5
Flagged (5+ failures within 300s, or a login after them): 2

IP                 Fails  Burst  Invalid  Top usernames
198.51.100.77         18     18        0  admin
203.0.113.45          46     46        9  ftpuser, pi, guest, ubuntu

!! 198.51.100.77 logged in as 'admin' at 2026-10-12 03:48:42 after 18 failures. Check this account now and rotate its password.

Failures by hour:
  02:00 ############################## 46
  03:00 ############ 18
  09:00 # 1
  14:00 # 1
  15:00 ## 3

# cisco rules
ip access-list extended BLOCK-SSH-ATTACKERS
 deny tcp host 198.51.100.77 any eq 22
 deny tcp host 203.0.113.45 any eq 22
 permit ip any any
```

Other options:

```sh
# stricter: 3 failures within 60 seconds
python3 log_analyzer.py /var/log/auth.log --threshold 3 --window 60

# read from systemd's journal
journalctl -u ssh --no-pager | python3 log_analyzer.py -

# JSON for a SIEM or a report
python3 log_analyzer.py sample/auth.log --json
```

## How detection works

- **Burst:** a sliding window over each IP's failure times finds the largest number of failures within `--window` seconds. An IP is flagged when that reaches `--threshold`. A slow attacker below the threshold (like `192.0.2.200` in the sample) is counted but not flagged.
- **Possible compromise:** an IP that logs in successfully after at least `--threshold` failures. One typo before a good login isn't flagged.
- **Invalid users:** distinct usernames tried that don't exist on the server, a sign of dictionary attacks.

`sample/auth.log` is generated test data. All public IPs in it are from the ranges reserved for documentation (RFC 5737).

## Tests

```sh
python3 -m unittest discover -s tests
```
