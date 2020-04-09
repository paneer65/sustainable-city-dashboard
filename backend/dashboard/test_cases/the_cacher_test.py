"""
Test cases for TheCacher
"""
from django.test import TestCase
from django.core.cache import cache
from django.contrib.auth import get_user_model

from dashboard.the_cacher import TheCacher, CACHE_KEYS

class TheCacherTest(TestCase):
    """TheCacher test class"""
    def test_reset_all_cached_users(self):
        """Method to test reset_all_cached_users"""
        cache.set(CACHE_KEYS['all_users'], True)
        self.assertEqual(cache.get(CACHE_KEYS['all_users']), True)
        TheCacher.reset_all_cached_users()
        self.assertEqual(cache.get(CACHE_KEYS['all_users']), None)

    def test_get_all_cached_users_when_cache_is_present(self):
        """Method to test get_all_cached_users when data is present in the cache"""
        cache.set(CACHE_KEYS['all_users'], True)
        test_cache = TheCacher.get_all_cached_users()
        self.assertEqual(test_cache, True)
        cache.clear()

    def test_get_all_cached_users_from_db(self):
        """Method to test get_all_cached_users when data is not present in the cache"""
        get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )
        cache.clear()
        self.assertEqual(cache.get(CACHE_KEYS['all_users']), None)
        test_cache = TheCacher.get_all_cached_users()
        self.assertEqual(test_cache.__class__.__name__, 'QuerySet')

    def test_user_creation_clears_cache(self):
        """ Test that user creation resets cache """
        cache.set(CACHE_KEYS['all_users'], True)
        self.assertEqual(cache.get(CACHE_KEYS['all_users']), True)

        get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )
        self.assertEqual(cache.get(CACHE_KEYS['all_users']), None)

    def test_get_latest_news(self):
        """
        Test getting the latest news when cache is empty
        """
        cache.set(CACHE_KEYS['latest_news'], None)
        news = TheCacher.get_latest_news()

        self.assertTrue(news)
        self.assertTrue(cache.get(CACHE_KEYS['latest_news']))
