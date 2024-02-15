from flask import request, jsonify
from datetime import datetime, timedelta
import pandas as pd
import json
import jwt
import bcrypt

class Login:
        
    def login(self,identifier,password,db_Connection):
        logInQuery = """
                SELECT *
                FROM Login_information
                WHERE Email = '{}';
                """.format(identifier)
        
        try:
            print("Before LoginData")
            LoginData = db_Connection.send_query(logInQuery)
            
            print("Checking Password")
            byteDBPassword = LoginData.at[0, 'Pass_word'].encode('utf-8')
            bytePassword = password.encode('utf-8')
            if not bcrypt.checkpw(bytePassword, byteDBPassword):
                print("The bcrypt check failed")
                raise Exception
            
            print("Password Correct")

            idQuery = """
                SELECT *
                FROM {}
                WHERE Email = '{}';
                """.format(LoginData.at[0, 'Account_Type'],identifier)
            print("Getting User Info")

            userInfo = db_Connection.send_query(idQuery)

            print("Creating Payload")
            payload = {'message': 'Login successful!', 
                   'email': LoginData.at[0, 'Email'], 
                   'role': LoginData.at[0, 'Account_Type'], 
                   'id': userInfo.iat[0, 0],
                   'exp': datetime.utcnow() + timedelta(hours=16)}
            
            print("Returning Payload")
            return payload
        
        except Exception as e:
            print(e)
            print("Email or Password Was Incorrect")
            print("Login Failed")
            payload = ({'message': 'Invalid credentials'})
            return payload, 401
            
        
        
       
