''' This module helps in creating encrypted tokens '''
import jwt

class JwToken:
    ''' JwToken class has functions to encode and decode '''

    def __init__(self):
        self.secretkey = 'asd'

    def encode_text(self, payload, alg='HS256'):
        ''' Function to Encrypt Login Details '''
        encoded_jwt = jwt.encode(payload, self.secretkey, algorithm=alg)
        return encoded_jwt

    def decode_text(self, encoded_text, alg='HS256'):
        ''' Function to Decrypt Key '''
        decoded_jwt = jwt.decode(encoded_text, self.secretkey, algorithms=alg)
        return decoded_jwt
