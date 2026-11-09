import socket
import sys
import threading
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import portscan as ps  # noqa: E402


class ParseTests(unittest.TestCase):
    def test_ranges_and_lists(self):
        self.assertEqual(ps.parse_ports("22, 80,8000-8002"), [22, 80, 8000, 8001, 8002])
        self.assertEqual(ps.parse_ports("5-3"), [3, 4, 5])

    def test_invalid(self):
        with self.assertRaises(ValueError):
            ps.parse_ports("0,70000")

    def test_targets(self):
        self.assertEqual(ps.expand_targets("10.0.0.0/30"), ["10.0.0.1", "10.0.0.2"])
        self.assertEqual(ps.expand_targets("10.0.0.7"), ["10.0.0.7"])
        self.assertEqual(ps.expand_targets("printer.local"), ["printer.local"])
        with self.assertRaises(ValueError):
            ps.expand_targets("10.0.0.0/16")


class LiveScanTests(unittest.TestCase):
    """Scan a throwaway server on localhost."""

    def setUp(self):
        self.srv = socket.socket()
        self.srv.bind(("127.0.0.1", 0))
        self.srv.listen()
        self.port = self.srv.getsockname()[1]

        def serve():
            try:
                while True:
                    conn, _ = self.srv.accept()
                    conn.sendall(b"SSH-2.0-OpenSSH_9.6 test\r\n")
                    conn.close()
            except OSError:
                pass

        threading.Thread(target=serve, daemon=True).start()

    def tearDown(self):
        self.srv.close()

    def test_finds_open_port_and_banner(self):
        closed = self.port + 1 if self.port < 65535 else self.port - 1
        [host] = ps.scan(["127.0.0.1"], [self.port, closed], timeout=0.5, banner=True)
        self.assertEqual([r.port for r in host.open_ports], [self.port])
        self.assertIn("OpenSSH", host.open_ports[0].banner)


if __name__ == "__main__":
    unittest.main()
