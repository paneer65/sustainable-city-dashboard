from django.test import TestCase

class SanityTest(TestCase):
    def test_addition_sanity(self):
        print('Method: test_addition_sanity')
        self.assertEqual(1 + 1, 2)