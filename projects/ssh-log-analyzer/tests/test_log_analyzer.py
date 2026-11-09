import sys
import unittest
from datetime import timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import log_analyzer as la  # noqa: E402

LOG = """\
Oct 12 02:14:03 srv sshd[100]: Invalid user pi from 203.0.113.45 port 40000
Oct 12 02:14:03 srv sshd[100]: Failed password for invalid user pi from 203.0.113.45 port 40000 ssh2
Oct 12 02:14:07 srv sshd[101]: Failed password for root from 203.0.113.45 port 40001 ssh2
Oct 12 02:14:10 srv sshd[102]: Failed password for root from 203.0.113.45 port 40002 ssh2
Oct 12 02:14:12 srv sshd[103]: Failed password for root from 203.0.113.45 port 40003 ssh2
Oct 12 02:14:15 srv sshd[104]: Failed password for root from 203.0.113.45 port 40004 ssh2
Oct 12 02:14:20 srv sshd[105]: Accepted password for root from 203.0.113.45 port 40005 ssh2
Oct 12 09:00:01 srv sshd[200]: Failed password for sepehr from 192.168.20.15 port 5000 ssh2
Oct 12 09:00:09 srv sshd[201]: Accepted password for sepehr from 192.168.20.15 port 5001 ssh2
2026-10-12T10:00:00.123456+03:30 srv sshd[300]: Failed publickey for git from 2001:db8::7 port 22 ssh2
Oct 12 11:00:00 srv sshd[400]: Server listening on 0.0.0.0 port 22.
"""


class AnalyzeTests(unittest.TestCase):
    def setUp(self):
        self.stats = la.analyze(LOG.splitlines(), year=2026)

    def test_counts(self):
        att = self.stats["203.0.113.45"]
        self.assertEqual(len(att.failures), 5)
        self.assertEqual(att.users["root"], 4)
        self.assertEqual(att.invalid_users, 1)  # "Invalid user" + "Failed ... invalid user" count once
        self.assertEqual(att.max_burst(timedelta(seconds=60)), 5)

    def test_iso_timestamps_and_ipv6(self):
        self.assertIn("2001:db8::7", self.stats)

    def test_compromise_needs_a_run_of_failures(self):
        self.assertTrue(self.stats["203.0.113.45"].compromised(5))
        self.assertFalse(self.stats["192.168.20.15"].compromised(5))  # one typo then a good login

    def test_flagging(self):
        flagged = la.suspicious(self.stats, threshold=5, window=timedelta(seconds=300))
        self.assertEqual([s.ip for s in flagged], ["203.0.113.45"])

    def test_burst_window(self):
        s = la.IpStats("x")
        base = self.stats["203.0.113.45"].failures[0]
        s.failures = [base + timedelta(minutes=10 * i) for i in range(6)]
        self.assertEqual(s.max_burst(timedelta(minutes=5)), 1)
        self.assertEqual(s.max_burst(timedelta(minutes=20)), 3)

    def test_block_rules(self):
        self.assertEqual(la.block_rules(["1.2.3.4"], "ufw"), ["ufw deny from 1.2.3.4 to any port 22 proto tcp"])
        cisco = la.block_rules(["1.2.3.4"], "cisco")
        self.assertEqual(cisco[-1], " permit ip any any")

    def test_sample_log(self):
        with open(ROOT / "sample" / "auth.log") as f:
            stats = la.analyze(f, 2026)
        flagged = {s.ip for s in la.suspicious(stats, 5, timedelta(seconds=300))}
        self.assertEqual(flagged, {"203.0.113.45", "198.51.100.77"})


if __name__ == "__main__":
    unittest.main()
