import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import genconfig as g  # noqa: E402


def load(name):
    return json.loads((ROOT / "examples" / name).read_text())


class PortTests(unittest.TestCase):
    def test_expand(self):
        self.assertEqual(g.expand_ports("Gi1/0/1-3, Fa0/10"), ["Gi1/0/1", "Gi1/0/2", "Gi1/0/3", "Fa0/10"])

    def test_bad(self):
        with self.assertRaises(g.ConfigError):
            g.expand_ports("port five")
        with self.assertRaises(g.ConfigError):
            g.expand_ports("Gi1/0/9-2")

    def test_ios_range(self):
        self.assertEqual(g.ios_range("Gi1/0/1-6,Gi1/0/10"), "Gi1/0/1 - 6 , Gi1/0/10")


class ValidateTests(unittest.TestCase):
    def test_good_example(self):
        self.assertEqual(g.validate(load("hotel-floor1.json")), [])

    def test_broken_example_finds_every_problem(self):
        problems = "\n".join(g.validate(load("broken.json")))
        for needle in ["VLAN 1003 is reserved", "Gi1/0/4 used by both", "access VLAN 50",
                       "undefined VLAN 20", "VLAN hopping", "management VLAN 99", "not in management subnet"]:
            self.assertIn(needle, problems)

    def test_render_refuses_broken(self):
        with self.assertRaises(g.ConfigError):
            g.render(load("broken.json"))


class RenderTests(unittest.TestCase):
    def setUp(self):
        self.text = g.render(load("hotel-floor1.json"))

    def test_hardening(self):
        for line in ["transport input ssh", "ip ssh version 2", "no ip http server",
                     "spanning-tree portfast bpduguard default", "ip dhcp snooping vlan 10,20,30,40",
                     " access-class MGMT-ONLY in"]:
            self.assertIn(line, self.text)

    def test_unused_ports_parked(self):
        self.assertIn("interface Gi1/0/17\n description UNUSED", self.text)
        self.assertNotIn("interface Gi1/0/24\n description UNUSED", self.text)
        self.assertEqual(self.text.splitlines().count(" shutdown"), 7)

    def test_trunk(self):
        self.assertIn(" switchport trunk allowed vlan 10,20,30,40,99", self.text)
        self.assertIn(" switchport trunk native vlan 100", self.text)

    def test_output_file_is_current(self):
        saved = (ROOT / "examples" / "output" / "SW-FLOOR1.cfg").read_text()
        self.assertEqual(saved, self.text)


if __name__ == "__main__":
    unittest.main()
