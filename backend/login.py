from flask import request, jsonify
from datetime import datetime, timedelta
import pandas as pd
import json
import jwt

class Login:
    def __init__(self):
        self.users = {
            'user1': {'password': 'password1', 'email': 'user1@example.com', 'role': 'student', 'id' : 0 },
            'user2': {'password': 'password2', 'email': 'user2@example.com', 'role': 'faculty', 'id' : 1 },
            'user3': {'password': 'password3', 'email': 'user3@example.com', 'role': 'client', 'id' : 2 }
        }

    def login(self,identifier,password,db_Connection):
        logInQuery = """
                SELECT *
                FROM Login_information
                WHERE Email = '{}' AND Pass_word = '{}';
                """.format(identifier, password)
        
        
        try:
            LoginData = db_Connection.send_query(logInQuery)
            
            idQuery = """
                SELECT *
                FROM {}
                WHERE Email = '{}';
                """.format(LoginData.at[0, 'Account_Type'],identifier)
            userInfo = db_Connection.send_query(idQuery)

            payload = {'message': 'Login successful!', 
                   'email': LoginData.at[0, 'Email'], 
                   'role': LoginData.at[0, 'Account_Type'], 
                   'id': userInfo.at[0, 'S_id'],
                   'exp': datetime.utcnow() + timedelta(hours=16)}
            return payload
        except Exception as e:
            print("Email or Password Was Incorrect")
        
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
        payload = ({'message': 'Invalid credentials'})
        return payload, 401
