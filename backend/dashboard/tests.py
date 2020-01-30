""" Test Cases """
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

class SanityTest(TestCase):
    """ Sanity Test """
    def test_addition_sanity(self):
        """ Basic Sanity Test """
        print('Method: test_addition_sanity')
        self.assertEqual(1 + 1, 2)

class UserViewsTest(TestCase):
    """ Test for User Views """
    def setUp(self):
        """ Initialise User for Login """
        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )

    def test_login_view_for_valid_user(self):
        """ Test for Valid User Login """
        response = self.client.post(reverse('user_login'), {
            'username': 'test_user',
            'password': 'test_pass'
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_login_view_for_invalid_user(self):
        """ Test for Invalid User Login """
        response = self.client.post(reverse('user_login'), {
            'username': 'password123',
            'password': 'password123'
        }, format='json')
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            response.data['error'],
            'Username or password is invalid'
        )

    def test_create_user_valid(self):
        """ Test for Valid User Creation """
        response = self.client.post(reverse('create_user'), {
            'username': 'test_user2',
            'password': 'password2',
            'email': 'test_user2@gmail.com'
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_user_invalid(self):
        """ Test for Invalid User Creation """
        response = self.client.post(reverse('create_user'), {
            'username': 'test_user',
            'password': 'password2',
            'email': 'test_user2@gmail.com'
        }, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data['error'],
            'Username or email already exists'
        )

    def test_view_user_valid(self):
        """ Test for Viewing Users """
        response = self.client.get(reverse('view_users'), format='json')
        self.assertEqual(response.status_code, 200)
