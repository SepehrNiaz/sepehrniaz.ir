import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import subnet_calc as sc  # noqa: E402


class InfoTests(unittest.TestCase):
    def test_slash_26(self):
        s = sc.info("192.168.10.37/26")
        self.assertEqual(str(s.network), "192.168.10.0/26")
        self.assertEqual(s.netmask, "255.255.255.192")
        self.assertEqual(s.wildcard, "0.0.0.63")
        self.assertEqual(s.broadcast, "192.168.10.63")
        self.assertEqual(s.first_host, "192.168.10.1")
        self.assertEqual(s.last_host, "192.168.10.62")
        self.assertEqual(s.usable_hosts, 62)
        self.assertEqual(s.ip_class, "C")

    def test_point_to_point(self):
        self.assertEqual(sc.info("10.0.0.0/31").usable_hosts, 2)
        self.assertEqual(sc.info("10.0.0.5/32").usable_hosts, 1)


class SplitTests(unittest.TestCase):
    def test_split_into_eight(self):
        nets = sc.split("10.0.0.0/24", 27)
        self.assertEqual(len(nets), 8)
        self.assertEqual(str(nets[-1]), "10.0.0.224/27")

    def test_bad_prefix(self):
        with self.assertRaises(ValueError):
            sc.split("10.0.0.0/24", 20)


class VlsmTests(unittest.TestCase):
    def test_prefix_for_hosts(self):
        self.assertEqual(sc.prefix_for_hosts(2), 30)
        self.assertEqual(sc.prefix_for_hosts(62), 26)
        self.assertEqual(sc.prefix_for_hosts(63), 25)
        self.assertEqual(sc.prefix_for_hosts(300), 23)

    def test_plan_packs_largest_first(self):
        plan = sc.vlsm("172.16.0.0/22", {"Office": 25, "Rooms": 300, "Cameras": 60, "Reception": 120})
        got = [(name, str(net)) for name, _, net in plan]
        self.assertEqual(got, [
            ("Rooms", "172.16.0.0/23"),
            ("Reception", "172.16.2.0/25"),
            ("Cameras", "172.16.2.128/26"),
            ("Office", "172.16.2.192/27"),
        ])

    def test_too_small(self):
        with self.assertRaises(ValueError):
            sc.vlsm("192.168.1.0/24", {"A": 200, "B": 100})


if __name__ == "__main__":
    unittest.main()
