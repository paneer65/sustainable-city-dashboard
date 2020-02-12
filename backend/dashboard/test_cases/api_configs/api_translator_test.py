"""
Test cases for api translator
"""

from django.test import TestCase
from dashboard.test_cases.api_configs.pollution_test_response import POLLUTION_RESPONSE
from dashboard.api_configs.api_translator import APITranslator
class APITranslatorTest(TestCase):
    """
    API Translator
    """

    def test_response_to_model(self):
        """
        Test that the response is converted to a model
        """
        api_translator = APITranslator("pollution", 1)
        models = api_translator.response_to_model(POLLUTION_RESPONSE)
        self.assertEqual(models[0].__class__.__name__, 'PollutionAPIData')
