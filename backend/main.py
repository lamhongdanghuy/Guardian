# Standard library imports
import json
import os
import sys
from os.path import expanduser

# Third party imports
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import pandas as pd
import paramiko
from paramiko import SSHClient
import sshtunnel
from sshtunnel import SSHTunnelForwarder
import mariadb
import pymysql
from sqlalchemy import create_engine

# Local application imports
from login import Login
from apply import apply
from connectDB import DatabaseConnection


app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)


query = "SELECT * FROM Client"
data = DatabaseConnection().select_query(query)
print(data)

query = "SELECT * FROM Company"
data = DatabaseConnection().select_query(query)
print(data)



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('email')
    password = data.get('password')
    print(identifier)
    print(password)
    loginInstance = Login()                         #Create a Login instance for when a user logs in from the website
    db_Connection = DatabaseConnection()            #Create a database connection to pass into login instance to send queries for identifing person logging in
    payload = loginInstance.login(identifier,password,db_Connection)
    token = jwt.encode(payload, app.config["SECRET KEY"])
    return jsonify(token)


@app.route('/apply/client', methods=['POST'])
def client_apply():
    data = request.get_json()
    applyInstance = apply()
    message = applyInstance.client_apply(data)
    return jsonify({'message': message})


@app.route('/apply/student', methods=['POST'])
def student_apply():
    data = request.get_json()
    applyInstance = apply()
    message = applyInstance.student_apply(data)
    return jsonify({'message': message})



if __name__ == "__main__":
    app.run()
