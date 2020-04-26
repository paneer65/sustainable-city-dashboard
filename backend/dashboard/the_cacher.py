"""
The CACHER module!
"""
from datetime import datetime
from datetime import timedelta

from django.core.cache import cache
from django.contrib.auth.models import User

from dashboard.api_configs.api_translator import APITranslator

CACHE_KEYS = {
    'all_users': 'all_users',
    'news_updated_at': 'news_updated_at',
    'latest_news': 'latest_news',
    'pollution': 'pollution',
    'pollution_updated_at': 'pollution_updated_at',
    'bikes': 'bikes',
    'bikes_updated_at': 'bikes_updated_at',
    'bus': 'bus',
    'bus_updated_at': 'bus_updated_at'
}

class TheCacher():
    """ Mehtods to get cached models """

    @staticmethod
    def reset_all_cached_users():
        """Reset users cache on model change"""
        cache.delete(CACHE_KEYS['all_users'])

    @staticmethod
    def get_all_cached_users():
        """Get all cached users"""
        users = cache.get(CACHE_KEYS['all_users'])

        if not users:
            users = User.objects.all()
            cache.set(CACHE_KEYS['all_users'], users)

        return users

    @staticmethod
    def get_news_last_updated():
        """
        Get the last time news was updated
        """
        return cache.get(CACHE_KEYS['news_updated_at'])

    @staticmethod
    def reset_news_last_updated():
        """
        Set the last updated time for news
        """
        cache.delete(CACHE_KEYS['news_updated_at'])

    @staticmethod
    def get_latest_news():
        """
        Get the latest news. If news is not cached fetch latest news and cache
        """

        news = cache.get(CACHE_KEYS['latest_news'])
        updated_at = cache.get(CACHE_KEYS['news_updated_at'])

        if updated_at:
            time_delta = datetime.now() - updated_at

        # If the cache exceeds 24 hours, fetch latest
        if not news or not updated_at or time_delta > timedelta(hours=24):
            api_translator = APITranslator("news", 1)
            response = api_translator.build_api_request()
            models = api_translator.response_to_model(response)

            news = models
            cache.set(CACHE_KEYS['latest_news'], news)
            cache.set(CACHE_KEYS['news_updated_at'], datetime.now())

        return news

    @staticmethod
    def get_cached_pollution_data():
        """ Get cached pollution data """
        cache.get(CACHE_KEYS['pollution'])

    @staticmethod
    def get_cached_bus_data():
        """ Get cached bus data """
        cache.get(CACHE_KEYS['bus'])

    @staticmethod
    def get_cached_bikes_data():
        """ Get cached bikes data """
        cache.get(CACHE_KEYS['bikes'])
