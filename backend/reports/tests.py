"""
Test cases for reports module
"""
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

class ReportViewsTest(TestCase):
    """
    Test Reports Views
    """

    def setUp(self):
        """ Initialise User for Login """

        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )
        token, _ = Token.objects.get_or_create(user=self.user)
        self.headers = {'HTTP_AUTHORIZATION': 'Token ' + str(token)}

    def test_location_line_chart_view_pollution(self):
        """ Test location line chart is generated for pollution view """

        data = {
            'model': 'Pollution',
            'coordinates': {
                'latitude': 10,
                'longitude': 10
            },
            'parameters': {'parameter': 'o3'}
        }

        response = self.client.post(
            reverse('location_line_chart'),
            data,
            format='json',
            content_type='application/json',
            **self.headers
        )

        self.assertEqual(response.status_code, 200)
        self.assertSequenceEqual(list(response.data.keys()), ['chart_data', 'forecast_data'])

    def test_location_line_chart_view_bikes(self):
        """ Test location line chart is generated for bikes view """

        data = {
            'model': 'Bikes',
            'coordinates': {
                'latitude': 10,
                'longitude': 10
            },
            'parameters': {'parameter': 'number_of_bikes'}
        }

        response = self.client.post(
            reverse('location_line_chart'),
            data,
            format='json',
            content_type='application/json',
            **self.headers
        )

        self.assertEqual(response.status_code, 200)
        self.assertSequenceEqual(list(response.data.keys()), ['chart_data', 'forecast_data'])
