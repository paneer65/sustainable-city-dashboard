""" Update tasks for API data """

from celery.decorators import periodic_task
from celery.task.schedules import crontab
from dashboard.api_configs.api_translator import APITranslator

class UpdateJobs():
    """
    Task that update API data
    All jobs run periodically at midnight
    """

    @staticmethod
    @periodic_task(
        run_every=(crontab(minute=0, hour=0)),
        name="update_news_data",
        ignore_result=True
    )
    def update_news_data():
        """ Update news data """
        api_translator = APITranslator("news", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        for model in models:
            model.save()

    @staticmethod
    @periodic_task(
        run_every=(crontab(minute=0, hour=0)),
        name="update_pollution_data",
        ignore_result=True
    )
    def update_pollution_data():
        """ Update pollution data """
        api_translator = APITranslator("pollution", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        for model in models:
            model.save()

    @staticmethod
    @periodic_task(
        run_every=(crontab(minute=0, hour=0)),
        name="update_bus_data",
        ignore_result=True
    )
    def update_bus_data():
        """ Update bus data """
        api_translator = APITranslator("bus", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        for model in models:
            model.save()

    @staticmethod
    @periodic_task(
        run_every=(crontab(minute=0, hour=0)),
        name="update_bikes_data",
        ignore_result=True
    )
    def update_bikes_data():
        """ Update bikes data """
        api_translator = APITranslator("bikes", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        for model in models:
            model.save()
