import socket
import sys
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import monitor as m  # noqa: E402


class MonitorTests(unittest.TestCase):
    def setUp(self):
        self.srv = socket.socket()
        self.srv.bind(("127.0.0.1", 0))
        self.srv.listen()
        self.port = self.srv.getsockname()[1]
        self.tmp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.srv.close()
        self.tmp.cleanup()

    def test_load_devices(self):
        devices = m.load_devices(ROOT / "devices.csv")
        self.assertEqual(len(devices), 10)
        self.assertIsNone(devices[0].port)  # empty port -> ping
        self.assertEqual(devices[1].port, 443)

    def test_tcp_up_and_down(self):
        up = m.check(m.Device("srv", "127.0.0.1", "server", self.port))
        self.assertTrue(up.up)
        self.assertIsNotNone(up.latency_ms)
        closed = socket.socket()
        closed.bind(("127.0.0.1", 0))
        free_port = closed.getsockname()[1]
        closed.close()
        down = m.check(m.Device("gone", "127.0.0.1", "server", free_port), timeout=0.3)
        self.assertFalse(down.up)

    def test_history_and_dashboard(self):
        h = m.History(Path(self.tmp.name) / "h.db")
        dev = m.Device("Printer", "127.0.0.1", "printer", 9100, "Reception")
        now = datetime.now()
        h.save([m.Check(dev, s, 3.0 if s else None, now - timedelta(minutes=10 - i))
                for i, s in enumerate([True, True, False, False])])
        pct, n = h.uptime(now - timedelta(days=1))["Printer"]
        self.assertEqual((pct, n), (50.0, 4))
        self.assertEqual(h.last_change("Printer", False), (now - timedelta(minutes=8)).isoformat())

        page = m.render_dashboard([m.Check(dev, False, None, now)], h.uptime(now - timedelta(days=1)), h)
        self.assertIn("1 device(s) down: Printer", page)
        self.assertIn("50.0% / 24h", page)

    def test_dashboard_escapes_names(self):
        dev = m.Device("<script>", "h", "x", 1)
        page = m.render_dashboard([m.Check(dev, True, 1.0, datetime.now())], {})
        self.assertNotIn("<script>", page)


if __name__ == "__main__":
    unittest.main()
