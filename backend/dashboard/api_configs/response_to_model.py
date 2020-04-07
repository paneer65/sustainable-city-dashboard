"""
Static helper to convert HTTP response object to their respective models
"""
# Disable unused variable as eval is using the variable
# pylint: disable=unused-variable,eval-used,unused-argument

from dashboard.tables.news_api_data import NewsAPIData
from dashboard.tables.bus_api_data import BusAPIData

class ResponseToModel():
    """
    Handles mapping of responses to models
    """

    @staticmethod
    def response_to_news_model(response_body_type, response_body, translation_body):
        """
        Convert News api response to models
        """
        result = []

        if response_body_type == 'array':
            for res in response_body:
                model = NewsAPIData(
                    source=eval('res' + translation_body['source']),
                    title=eval('res' + translation_body['title']),
                    description=eval('res' + translation_body['description']),
                    url=eval('res' + translation_body['url']),
                    url_to_image=eval('res' + translation_body['url_to_image']),
                    published_at=eval('res' + translation_body['published_at']),
                )

                result.append(model)
        else:
            model = NewsAPIData(
                source=eval('respones_body' + translation_body['source']),
                title=eval('respones_body' + translation_body['title']),
                description=eval('respones_body' + translation_body['description']),
                url=eval('respones_body' + translation_body['url']),
                url_to_image=eval('respones_body' + translation_body['url_to_image']),
                published_at=eval('respones_body' + translation_body['published_at']),
            )

            result.append(model)

        return result

    @staticmethod
    def response_to_bus_model(response_body_type, response_body, translation_body):
        """
        Convert Bus api response to models
        """

        result = []
        if response_body_type == 'array':
            for res in response_body:
                model = BusAPIData(
                    stopid=eval('res' + translation_body['stopid']),
                    latitude=eval('res' + translation_body['latitude']),
                    shortname=eval('res' + translation_body['shortname']),
                    longitude=eval('res' + translation_body['longitude'])
                )
                result.append(model)
        else:
            model = BusAPIData(
                stopid=eval('response_body' + translation_body['stopid']),
                latitude=eval('response_body' + translation_body['latitude']),
                shortname=eval('response_body' + translation_body['shortname']),
                longitude=eval('response_body' + translation_body['longitude'])
            )
            result.append(model)

        return result
