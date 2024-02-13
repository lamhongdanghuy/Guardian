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


app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
filename = os.path.join(parent_dir, 'DePaul-Guardian-Clinic.pem')

mypkey = paramiko.RSAKey.from_private_key_file(filename, password= None)
ssh_host ='18.216.233.27'
ssh_username ='ubuntu'
ssh_password =None
ssh_port = 22
db_port = 3306
db_username ='Admin'
db_password ='Hhe^3828jsu37s92j'
db_name ='CyberSecurity'
localhost ='127.0.0.1'

# engine = create_engine('http://18.216.233.27')
query = "SELECT * FROM Login_information"


tunnel =SSHTunnelForwarder((ssh_host,ssh_port),ssh_username=ssh_username,ssh_pkey=mypkey,remote_bind_address=(localhost,db_port))
tunnel.start()

# Convert the port number to an integer
local_bind_port = int(tunnel.local_bind_port)

# Pass the port number as part of the URL string
engine = create_engine(f'mysql+pymysql://{db_username}:{db_password}@{localhost}:{local_bind_port}/{db_name}')

data = pd.read_sql_query(query, engine)
print(data)

tunnel.close()



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('email')
    password = data.get('password')
    print(identifier)
    print(password)
    loginInstance = Login()
    payload = loginInstance.login(identifier,password)
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
