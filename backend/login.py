from flask import request, jsonify
from datetime import datetime, timedelta
import pandas as pd
import json
import jwt
import bcrypt

class Login:
        
    def login(self,identifier,password,db_Connection):
        #This is to look into the Login_Information table with the 'identifier' which is the entered email.
        logInQuery = """
                SELECT *
                FROM LOGIN_INFORMATION
                WHERE Email = '{}';
                """.format(identifier)
        
        try:
            print("Before LoginData")                            #Check for email in Login_Information table 
            LoginData = db_Connection.select_query(logInQuery)   #This gets the information of the users login data if the email they entered exists 
            
            print("Checking Password")                           #Check for password in Login_Information table
            byteDBPassword = LoginData.at[0, 'Password'].encode('utf-8')   #Looks at retrieved dataframe 'LoginData' at the first row and column 'Pass_word' then encodes it into bytes since it is retrieved as a string
            bytePassword = password.encode('utf-8')                         #This encodes the user entered password into bytes so it is comparable to the hashed password in the Login_Information table
            if not bcrypt.checkpw(bytePassword, byteDBPassword):            #Compares
                print("The bcrypt check failed")
                raise Exception
            
            print("Password Correct")
            #Create the idQuery to look into the table based on the name of the Account_Type that is retrieved into LoginData then using the email to get the user's data in the respective table, specifically the ID to add into the token
            idQuery = """
                SELECT *
                FROM {}
                WHERE Email = '{}';
                """.format(LoginData.at[0, 'Account_Type'].upper(),identifier)
            userInfo = db_Connection.select_query(idQuery)
            print(userInfo)

            print("Creating Payload")
            #The payload is created with the user's information to be sent back to the user for verification of a valid login and the information in the payload to create a unique token. The 'exp' is to make the login token so the user is signed out automatically 16 hours after the time of login.
            #The user ID is expected to be the first column of the Account_Type Table
            payload = {'message': 'Login successful!', 
                   'email': LoginData.at[0, 'Email'], 
                    'role': userInfo.at[0, 'Role'] if 'Role' in userInfo.columns else 'client',
                   'id': userInfo.iat[0, 0],
                   'exp': datetime.utcnow() + timedelta(hours=16)}
            print(payload)
            return payload
        
        except Exception as e:
            print(e)
            print("Email or Password Was Incorrect")
            print("Login Failed")
            payload = ({'message': 'Invalid credentials'})
            return payload, 401
            
        
        
       
