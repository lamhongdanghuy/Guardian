# Standard library imports
import json
import os
import sys
from os.path import expanduser

# Third party imports
from flask import Flask, request, jsonify, url_for
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
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import smtplib
from email.mime.text import MIMEText

# Local application imports
from login import Login
from apply import apply
from connectDB import DatabaseConnection
from proposal import proposal

app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)

query = "SELECT F_Name FROM STUDENT WHERE Student_ID = '1e919b57-21b1-3c03-aaba-1221a271b79a'"
data = DatabaseConnection().select_query(query).at[0, 'F_Name']
print(data)

#SMTP server configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 465
sender_email = 'phuonghaodinh2002@gmail.com'
password = 'snmz oioc xwoa nvhp'

#Create URLSafeTimedSerializer object
s = URLSafeTimedSerializer(app.config['SECRET KEY'])

@app.route('/approveProposal', methods=['POST'])
def proposalInfo():
    data = request.get_json()
    proposal_ID = data.get('ProposalID')
    approve = proposal()
    respone = approve.approve_proposal(proposal_ID)
    return respone, 200

@app.route('/rejectProposal', methods=['POST'])
def proposalInfo():
    data = request.get_json()
    proposal_ID = data.get('ProposalID')
    reject = proposal()
    respone = reject.reject_proposal(proposal_ID)
    return respone, 200

@app.route('/proposalInfo', methods=['POST'])
def proposalInfo():
    data = request.get_json()
    proposal_ID = data.get('ProposalID')
    get_Info = proposal()
    respone = get_Info.get_proposal_info(proposal_ID)
    return respone, 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('email')
    password = data.get('password')
    print(identifier)
    print(password)
    loginInstance = Login()
    db_Connection = DatabaseConnection()
    payload = loginInstance.login(identifier,password,db_Connection)
    token = jwt.encode(payload, app.config["SECRET KEY"])
    return jsonify(token)

@app.route('/apply/student', methods=['POST'])
def student_apply():
    data = request.get_json()
    applyInstance = apply()
    applyInstance.student_apply(data)
    email = data.get('email')
    verify_email(email)
    return jsonify({'message': 'Please confirm you email!'}), 200

@app.route('/apply/client', methods=['POST'])
def client_apply():
    data = request.get_json()
    applyInstance = apply()
    applyInstance.client_apply(data)
    email = data.get('email')
    verify_email(email)
    return jsonify({'message': 'Please confirm you email!'}), 200


def verify_email(email):
    server = None
    try:
        # Generate verification token
        token = s.dumps(email, salt='email-confirm')

        # Construct verification link
        link = url_for('confirm_email', token=token, _external=True)

        # Email body
        msg_body = 'Click the following link to confirm your email: {}'.format(link)

        # Send email
        msg = MIMEText(msg_body)
        msg['Subject'] = 'Confirm Your Email'
        msg['From'] = sender_email
        msg['To'] = email

        server = smtplib.SMTP_SSL(smtp_server, smtp_port) #Connect to the SMTP server
        server.login(sender_email, password) #Login to email account
        server.sendmail(sender_email, email, msg.as_string()) #Send the email
        print('Email sent successfully!') #Print success message
        
    except Exception as e:
        print(f'An error occurred: {e}')
    finally:
        if server:
            server.quit()  # Close the server connection if it was successfully initialized
            
@app.route('/confirm_email/<token>')
def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
        query = "UPDATE LOGIN_INFORMATION SET Email_Verified = 1 WHERE email = '{}'".format(email)
        DatabaseConnection().update_query(query)
    except SignatureExpired:
        return '<h1>The token is expired!</h1>'
    return '<h1>The email is confirmed!</h1>'

if __name__ == "__main__":
    app.run(debug=True)
