from flask import request, jsonify
import json

class Login:
    def __init__(self):

        self.users = {
            'user1': {'password': 'password1', 'email': 'user1@example.com', 'role': 'student', 'id' : 0 },
            'user2': {'password': 'password2', 'email': 'user2@example.com', 'role': 'faculty', 'id' : 1 },
            'user3': {'password': 'password3', 'email': 'user3@example.com', 'role': 'client', 'id' : 2 }
        }

    def login(self):
        data = request.get_json()
        identifier = data.get('email')
        password = data.get('password')
        print(identifier)
        print(password)

        for user, user_info in self.users.items():
            if user_info['password'] == password:
                print("Password Matched")
            if user_info['email'] == identifier:
                print("Email Matched")
            if (user_info['email'] == identifier or user == identifier) and user_info['password'] == password:
                print("Login Successful")
                return jsonify({'message': 'Login successful!', 'email': user_info['email'], 'role': user_info['role'], 'id': user_info['id']})
            
        
        
        print("Login Failed")
        return jsonify({'message': 'Invalid credentials'}), 401