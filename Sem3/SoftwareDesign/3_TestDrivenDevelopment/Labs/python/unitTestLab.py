import unittest
import snakestats


class mySnakeStatsTest(unittest.TestCase):
    def test_mean(self):
        res = snakestats.mean([1, 2, 3])
        self.assertEqual(res, 2.0)


unittest.main(argv=['ignored', '-v'], exit=False)
