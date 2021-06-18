import unittest


class testingUnitTesting(unittest.TestCase):
    def test_i_testEqual(self):
        self.assertEqual(2, 2)

    def test_i_testFalse(self):
        self.assertFalse(0)


unittest.main(argv=['ingnored', '-v'], exit=False)
