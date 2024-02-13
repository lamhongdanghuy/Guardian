from flask import request, jsonify
from datetime import datetime, timedelta
from email_validator import validate_email, EmailNotValidError

import json
import jwt

class Login:
    def __init__(self):

        self.users = {
            'user1': {'password': 'password1', 'email': 'user1@example.com', 'role': 'student', 'id' : 0 },
            'user2': {'password': 'password2', 'email': 'user2@example.com', 'role': 'faculty', 'id' : 1 },
            'user3': {'password': 'password3', 'email': 'user3@example.com', 'role': 'client', 'id' : 2 }
        }

    def email_check(self, email):
        try:
            validate_email(email)
        except EmailNotValidError:
            return False
        return True

    def login(self,identifier,password):
        if not self.email_check(identifier):
            print("Invalid Email Format")
            return jsonify({'message': 'Invalid email address'}), 40
        for user, user_info in self.users.items():
            if user_info['password'] == password:
                print("Password Matched")
            if user_info['email'] == identifier:
                print("Email Matched")
            if (user_info['email'] == identifier or user == identifier) and user_info['password'] == password:
                print("Login Successful")

                payload = {'message': 'Login successful!', 
                           'email': user_info['email'], 
                           'role': user_info['role'], 
                           'id': user_info['id'],
                           'exp': datetime.utcnow() + timedelta(hours=16)}
        return payload
            
        
        
        print("Login Failed")
        return jsonify({'message': 'Invalid credentials'}), 401
