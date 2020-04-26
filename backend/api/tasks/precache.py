""" Precache job """

from django.core.cache import cache
from celery.decorators import task
from dashboard.the_cacher import TheCacher
from dashboard.the_cacher import CACHE_KEYS
from dashboard.api_configs.api_translator import APITranslator

class Precache():
    """ Task that precaches API data """

    @staticmethod
    @task(name="precache_apis")
    def start_task():
        """ Master task """
        Precache.fetch_news_data.delay()
        Precache.fetch_pollution_data.delay()
        Precache.fetch_news_data.delay()
        Precache.fetch_bus_data.delay()
        Precache.fetch_bikes_data.delay()

    @staticmethod
    @task(name="fetch_news_data")
    def fetch_news_data():
        """ Cache news """
        TheCacher.get_latest_news()

    @staticmethod
    @task(name="fetch_pollution_data")
    def fetch_pollution_data():
        """ Cache pollution data """
        api_translator = APITranslator("pollution", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)
        cache.set(CACHE_KEYS['pollution'], models)

    @staticmethod
    @task(name="fetch_bus_data")
    def fetch_bus_data():
        """ Cache bus data """

        api_translator = APITranslator("bus", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)
        cache.set(CACHE_KEYS['bus'], models)

    @staticmethod
    @task(name="fetch_bikes_data")
    def fetch_bikes_data():
        """ Cache bikes data """

        api_translator = APITranslator("bikes", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)
        cache.set(CACHE_KEYS['bikes'], models)
