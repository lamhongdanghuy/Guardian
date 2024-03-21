# Contributors: Jesus Ocampo and Albert Luna

# Jesus Ocampo: Base Code 75%
# Albert Luna: Rewrite and implimentation 25%

import functools
import jwt
from flask import Flask, request
from flask_cors import CORS

import unittest
from unittest.mock import patch  # Import patch from unittest.mock

app = Flask(__name__)
app.config["SECRET_KEY"] = "1234"  # Corrected the key name
CORS(app)

# Protecter Decorator
# Meant to test whether token is expired or has been tampered with 
def Protector(func):
    @functools.wraps(func)
    def ProtectorWrapper(*args, **kwargs):
        try:
            token = request.headers.get('token')
            # Decode the token
            decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=['HS256'])  # Corrected the key name
            # If decoding is successful, the token is valid
            return func(*args, **kwargs)

        except jwt.ExpiredSignatureError:
            # If the token has expired
            print("Token has expired")

        except jwt.InvalidTokenError:
            # If the token is invalid for any other reason
            print("Invalid token")
    return ProtectorWrapper
    


# Sample function to test with the decorator
@Protector
def sample_protected_function(token):
    return "Protected function executed successfully"

class TestProtectorDecorator(unittest.TestCase):
    def setUp(self):
        self.secret_key = app.config["SECRET_KEY"]  # Corrected the key name
        self.valid_payload = {"user_id": 123}  # Sample payload for valid token
        self.valid_token = jwt.encode({'exp': 9999999999, **self.valid_payload}, self.secret_key)  # Set a far future expiration time
        self.expired_token = jwt.encode({'exp': 0, **self.valid_payload}, self.secret_key)  # Expired token
        self.invalid_token = "invalid_token"  # Invalid token

    def test_valid_token(self):
        result = sample_protected_function(self.valid_token)
        self.assertEqual(result, "Protected function executed successfully")

    def test_expired_token(self):
        # Ensure the function prints "Token has expired" when an expired token is passed
        with patch('builtins.print') as mock_print:
            sample_protected_function(self.expired_token)
            mock_print.assert_called_once_with("Token has expired")

    def test_invalid_token(self):
        # Ensure the function prints "Invalid token" when an invalid token is passed
        with patch('builtins.print') as mock_print:
            sample_protected_function(self.invalid_token)
            mock_print.assert_called_once_with("Invalid token")

if __name__ == "__main__":
    app.run()