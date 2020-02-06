""" Test Cases """
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from dashboard.jwtoken import JwToken

class SanityTest(TestCase):
    """ Sanity Test """
    def test_addition_sanity(self):
        """ Basic Sanity Test """
        print('Method: Sanity Test')
        self.assertEqual(1 + 1, 2)

class UserViewsTest(TestCase):
    """ Test for User Views """
    def setUp(self):
        """ Initialise User for Login """
        print('Method: Set Up User View')
        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )

    def test_login_view_for_valid_user(self):
        """ Test for Valid User Login """
        print('Method: Test for Valid User Login')
        response = self.client.post(reverse('user_login'), {
            'username': 'test_user',
            'password': 'test_pass'
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_login_view_for_invalid_user(self):
        """ Test for Invalid User Login """
        print('Method: Test for Invalid User Login')
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
        print('Method: Valid User Creation')
        response = self.client.post(reverse('create_user'), {
            'username': 'test_user2',
            'password': 'password2',
            'email': 'test_user2@gmail.com'
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_user_invalid(self):
        """ Test for Invalid User Creation """
        print('Method: Invalid User Creation')
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

class GenericTest(TestCase):
    """ Here we test Generic Test Cases """
    def test_encryption(self):
        """ Test for Encryption """
        print('Method: Test for Encryption')
        test1 = JwToken()
        payload = {'id':'test_admin', 'password':'test_password'}
        encrypted_test1 = test1.encode_text(payload)
        encrypted_test2 = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6I"\
        "nRlc3RfYWRtaW4iLCJwYXNzd29yZCI6InRlc3RfcGFzc3dvcmQifQ.MZW4iS2ImPke6"\
        "FLy0B09Eq6Y3qqTOAz_Ya2eyb4UsuE'"
        self.assertEqual(str(encrypted_test1), str(encrypted_test2))

    def test_decryption(self):
        """ Test for Decryption """
        print('Method: Test for Decryption')
        test2 = JwToken()
        payload = {'id2':'test_admin2', 'password2':'test_password2'}
        decrypted_test = test2.decode_text(test2.encode_text(payload))
        self.assertEqual(payload, decrypted_test)
