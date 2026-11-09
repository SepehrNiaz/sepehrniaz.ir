import random
import sys
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import helpdesk as hd  # noqa: E402


class DeskTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.desk = hd.Desk(Path(self.tmp.name) / "t.db")

    def tearDown(self):
        self.desk.db.close()
        self.tmp.cleanup()

    def test_open_close_cycle(self):
        t0 = datetime(2026, 10, 1, 9, 0)
        a = self.desk.add("Printer offline", "Reception", "printer", "high", opened=t0)
        b = self.desk.add("Password reset", "Sales", "account", "low", opened=t0)
        self.desk.add("Server down", "Management", "network", "urgent", opened=t0)
        self.desk.close(a, "Restarted spooler", t0 + timedelta(hours=2))   # within 4h target
        self.desk.close(b, "Reset", t0 + timedelta(hours=100))             # misses 72h target

        open_ids = [t["title"] for t in self.desk.tickets(open_only=True)]
        self.assertEqual(open_ids, ["Server down"])
        # urgent first, then by priority
        self.assertEqual([t["priority"] for t in self.desk.tickets()], ["urgent", "high", "low"])

        s = hd.summarize(self.desk.tickets())
        self.assertEqual((s["total"], s["closed"], s["open"]), (3, 2, 1))
        self.assertEqual(s["avg_hours"], 51.0)
        self.assertEqual(s["sla_pct"], 50.0)

    def test_cannot_close_twice(self):
        tid = self.desk.add("x")
        self.desk.close(tid, "done")
        with self.assertRaises(ValueError):
            self.desk.close(tid, "again")

    def test_rejects_unknown_area(self):
        with self.assertRaises(ValueError):
            self.desk.add("x", area="coffee")

    def test_month_filter(self):
        self.desk.add("a", opened=datetime(2026, 9, 30, 23, 0))
        self.desk.add("b", opened=datetime(2026, 10, 1, 8, 0))
        self.assertEqual([t["title"] for t in self.desk.tickets(month="2026-10")], ["b"])

    def test_demo_and_html(self):
        hd.seed_demo(self.desk, n=179, rng=random.Random(1))
        s = hd.summarize(self.desk.tickets())
        self.assertEqual(s["total"], 179)
        self.assertEqual(len(s["by_month"]), 10)
        page = hd.html_report(s, "Report <test>")
        self.assertIn("Report &lt;test&gt;", page)
        self.assertIn("By department", page)


if __name__ == "__main__":
    unittest.main()
