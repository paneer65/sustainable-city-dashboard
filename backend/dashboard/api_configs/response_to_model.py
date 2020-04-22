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
                routes = []
                operators = eval('res' + translation_body['operators_key'])
                for operator in operators:
                    routes += eval('operator' + translation_body['routes'])

                model = BusAPIData(
                    latitude=eval('res' + translation_body['latitude']),
                    longitude=eval('res' + translation_body['longitude']),
                    location_name=eval('res' + translation_body['location_name']),
                    stop_id=eval('res' + translation_body['stop_id']),
                    updated_at=eval('res' + translation_body['updated_at']),
                    routes=routes
                )
                result.append(model)

        return result
