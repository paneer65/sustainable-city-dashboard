"""
APITranslator
"""
# Disable unused variable as eval is using the variable
# pylint: disable=unused-variable,eval-used,unused-argument,too-many-branches,no-self-use,too-many-nested-blocks

import requests

from dashboard.api_configs.constants import API_TYPE_CLASS_MAP
from dashboard.tables.pollution_api_data import PollutionAPIData
from dashboard.tables.bikes_api_data import BikesAPIData
from dashboard.tables.bus_api_data import BusAPIData

class APITranslator():
    """
    APITranslator class that handles API mappings and calls
    """

    def __init__(self, api_type, api_id):
        """"
        Initialize API Translator
        """
        self._api_type = api_type
        self._api_id = api_id


    def response_to_pollution_model(self, response_body_type, response_body, translation_body):
        """
        Process response of pollution data and created
        models based on it
        """
        result = []
        if response_body_type == 'array':
            for res in response_body:
                if translation_body['measurement_type'] == 'array':
                    try:
                        latitude = eval('res' + translation_body['latitude'])
                        longitude = eval('res' + translation_body['longitude'])
                        location_name = eval('res' + translation_body['location_name'])
                        for measurement in eval('res' + translation_body['measurements_key']):
                            if translation_body['created_at']:
                                created_at = eval('measurement' + translation_body['created_at'])
                            else:
                                created_at = None

                            if translation_body['updated_at']:
                                updated_at = eval('measurement' + translation_body['updated_at'])
                            else:
                                updated_at = None

                            model = PollutionAPIData(
                                latitude=latitude,
                                longitude=longitude,
                                location_name=location_name,
                                parameter=eval('measurement' + translation_body['parameter']),
                                value=eval('measurement' + translation_body['value']),
                                created_at=created_at,
                                updated_at=updated_at
                            )

                            result.append(model)
                    except KeyError:
                        pass
                else:

                    if translation_body['created_at']:
                        created_at = eval('res' + translation_body['created_at'])
                    else:
                        created_at = None

                    if translation_body['updated_at']:
                        updated_at = eval('res' + translation_body['updated_at'])
                    else:
                        updated_at = None

                    model = PollutionAPIData(
                        latitude=eval('res' + translation_body['latitude']),
                        longitude=eval('res' + translation_body['longitude']),
                        location_name=eval('res' + translation_body['location_name']),
                        parameter=eval('res' + translation_body['parameter']),
                        value=eval('res' + translation_body['value']),
                        created_at=created_at,
                        updated_at=updated_at
                    )

                    result.append(model)
        else:

            if translation_body['created_at']:
                created_at = eval('response_body' + translation_body['created_at'])
            else:
                created_at = None

            if translation_body['updated_at']:
                updated_at = eval('response_body' + translation_body['updated_at'])
            else:
                updated_at = None

            model = PollutionAPIData(
                latitude=eval('response_body' + translation_body['latitude']),
                longitude=eval('response_body' + translation_body['longitude']),
                location_name=eval('response_body' + translation_body['location_name']),
                parameter=eval('response_body' + translation_body['parameter']),
                value=eval('response_body' + translation_body['value']),
                created_at=created_at,
                updated_at=updated_at
            )

            result.append(model)

        return result

    def response_to_bus_model(self, response_body_type, response_body, translation_body):
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


    def response_to_bikes_model(self, response_body_type, response_body, translation_body):
        """
        Convert bikes api response to models
        """
        result = []

        if response_body_type == 'array':
            for res in response_body:
                if translation_body['created_at']:
                    created_at = eval('res' + translation_body['created_at'])
                else:
                    created_at = None

                if translation_body['updated_at']:
                    updated_at = eval('res' + translation_body['updated_at'])
                else:
                    updated_at = None

                model = BikesAPIData(
                    latitude=eval('res' + translation_body['latitude']),
                    longitude=eval('res' + translation_body['longitude']),
                    number_of_bikes=eval('res' + translation_body['number_of_bikes']),
                    number_of_stands=eval('res' + translation_body['number_of_stands']),
                    total_capacity=eval('res' + translation_body['total_capacity']),
                    created_at=created_at,
                    updated_at=updated_at
                )

                result.append(model)
        else:
            if translation_body['created_at']:
                created_at = eval('response_body' + translation_body['created_at'])
            else:
                created_at = None

            if translation_body['updated_at']:
                updated_at = eval('response_body' + translation_body['updated_at'])
            else:
                updated_at = None

            model = BikesAPIData(
                latitude=eval('response_body' + translation_body['latitude']),
                longitude=eval('response_body' + translation_body['longitude']),
                number_of_bikes=eval('response_body' + translation_body['location_name']),
                number_of_stands=eval('response_body' + translation_body['number_of_stands']),
                total_capacity=eval('response_body' + translation_body['total_capacity']),
                created_at=created_at,
                updated_at=updated_at
            )

            result.append(model)

        return result

    def response_to_model(self, response):
        """
        Convert the response from API into a model
        """
        translation_map = API_TYPE_CLASS_MAP[self._api_type]['translation']
        # Fetch translation for specific api
        translation = next(item for item in translation_map if item["id"] == self._api_id)
        # import pdb; pdb.set_trace()
        # try:
        #     if translation['body_key']:
        #         response_body = eval('response' + translation['body_key'])
        #     else:
        #         response_body = response
        # except Exception as e:
        #     response_body = response

        if translation['body_key']:
            # import pdb; pdb.set_trace()
            response_body = eval('response' + translation['body_key'])
        else:
            response_body = response
        # import pdb; pdb.set_trace()

        if self._api_type == 'pollution':
            models = self.response_to_pollution_model(
                translation['body_type'],
                response_body,
                translation['mapping']
            )
        elif self._api_type == 'bikes':

            models = self.response_to_bikes_model(
                translation['body_type'],
                response_body,
                translation['mapping']
            )

        elif self._api_type == 'bus':


            models = self.response_to_bus_model(
                translation['body_type'],
                response_body,
                translation['mapping']
            )

        return models

    def build_api_request(self):
        """
        Build and call the API
        """
        translation_map = API_TYPE_CLASS_MAP[self._api_type]['translation']

        translation = next(item for item in translation_map if item["id"] == self._api_id)

        response = requests.get(
            url=translation["url"],
            params=translation["parameters"]
        ).json()

        return response
