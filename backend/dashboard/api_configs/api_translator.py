"""
APITranslator
"""
import requests

from dashboard.api_configs.constants import API_TYPE_CLASS_MAP
from dashboard.tables.pollution_api_data import PollutionAPIData
from dashboard.api_configs.pollution_api_mapping import POLLUTION_API_MAPPING

class APITranslator(object):
    """
    APITranslator class that handles API mappings and calls
    """

    def __init__(self, api_type, api_id):
        """"
        Initialize API Translator
        """
        self._api_type = api_type
        self._api_id = api_id

    def _response_to_pollution_model(self, response_body_type, response_body, translation_body):
        """
        Process response of pollution data and created
        models based on it
        """
        result = []

        if response_body_type == 'array':
            for res in response_body:
                model = PollutionAPIData(
                    latitude=eval('res' + translation_body['latitude']),
                    longitude=eval('res' + translation_body['longitude']),
                    location_name=eval('res' + translation_body['location_name']),
                    parameter=eval('res' + translation_body['parameter']),
                    value=eval('res' + translation_body['value']),
                    created_at=eval('res' + translation_body['created_at']),
                    updated_at=eval('res' + translation_body['updated_at'])
                )

                result.append(model)
        else:
            model = PollutionAPIData(
                latitude=eval('response_body' + translation_body['latitude']),
                longitude=eval('response_body' + translation_body['longitude']),
                location_name=eval('response_body' + translation_body['location_name']),
                parameter=eval('response_body' + translation_body['parameter']),
                value=eval('response_body' + translation_body['value']),
                created_at=eval('response_body' + translation_body['created_at']),
                updated_at=eval('response_body' + translation_body['lattitude'])
            )

            result.append(model)

        return result

    def _response_to_bikes_model(self, response):
        """
        Convert bikes api response to models
        """

        models = []

        return models, response

    def response_to_model(self, response):
        translation_map = API_TYPE_CLASS_MAP[self._api_type]['traslation']
        # Fetch translation for specific api
        translation = next(item for item in translation_map if item["id"] == self._api_id)
        if self._api_type == 'pollution':
            models = self._response_to_pollution_model(
                translation['body_type'],
                response[translation['body_key']],
                translation['mapping']
            )
        elif self._api_type == 'bikes':
            models = self._response_to_bikes_model(
                translation['body_type'],
                response[translation['body_key']],
                translation['mapping']
            )

        return models

    def build_api_request(self):
        """
        Build and call the API
        """
        response = requests.get(
            url=POLLUTION_API_MAPPING[0]["url"],
            params=POLLUTION_API_MAPPING[0]["parameters"][0]
            ).json()

        return response
