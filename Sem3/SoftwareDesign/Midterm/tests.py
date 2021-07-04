import unittest
import snakestats


class StatisticsTests(unittest.TestCase):
    def test_11_Average(self):
        avg = snakestats.average([2, 3, 4])
        self.assertEqual(avg, 3)

    def test_12_Average(self):
        avg = snakestats.average([2, 3, 4, 5, 6])
        self.assertEqual(avg, 4)

    def test_13_Average(self):
        avg = snakestats.average([2, 'b', 18, 20])
        self.assertRaises(Exception)

    def test_21_Variance(self):
        var = snakestats.variance([2, 2, 3, 5])
        self.assertEqual(var, 2)
        self.assertGreaterEqual(var, 0)

    def test_22_Variance(self):
        var = snakestats.variance([14, 12, 22, 23, 16,
                                   24, 22, 20, 18])
        self.assertEqual(var, 18)
        self.assertGreaterEqual(var, 0)

    def test_23_Variance(self):
        var = snakestats.variance(10)
        self.assertRaises(Exception)

    def test_31_Significance(self):
        sig = snakestats.significance([1, 4, 6, 7],
                                      [3, 6, 6, 8], 2.447)
        self.assertTrue(sig)

    def test_32_Significance(self):
        sig = snakestats.significance([1, 2, 3, 4, 5, 6, 7, 8, 9],
                                      [8, 13, 3, 9, 7, 12, 8, 13, 11],
                                      2.120)
        self.assertLogs()
        self.assertFalse(sig)

    def test_33_Significance(self):
        sig = snakestats.significance('Hello, World!', 44, 12.706)
        self.assertRaises(Exception)


unittest.main(argv=['ignored', '-v'], exit=False)
