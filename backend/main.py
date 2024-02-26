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
from Projects import Project
from Applications import Application
from login import Login
from apply import apply
from protector import Protector
from connectDB import DatabaseConnection
from infoGetter import infoGetter
# from protector import Protector
# Test imports 
from protector import TestProtectorDecorator

app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)


query = "SELECT * FROM LOGIN_INFORMATION"
data = DatabaseConnection().select_query(query)
print(data)

query = "SELECT * FROM PROJECT"
data = DatabaseConnection().select_query(query)
print(data)

#SMTP server configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 465
sender_email = 'phuonghaodinh2002@gmail.com'
password = 'snmz oioc xwoa nvhp'

#Create URLSafeTimedSerializer object
s = URLSafeTimedSerializer(app.config['SECRET KEY'])

@app.route('/projectInfo', methods =['POST'])
def project_info_get():
    data = request.get_json()
    dbconnect = DatabaseConnection()
    infoInstance = infoGetter()
    print(data['projectID'])
    id = data['projectID']
    payload = infoInstance.getprojectinfo(id,dbconnect)
    print(payload)
    return jsonify(payload), 200

@app.route('/studentInfo', methods =['POST'])
def student_info_get():
    data = request.get_json()
    dbconnect = DatabaseConnection()
    infoInstance = infoGetter()
    payload = infoInstance.getstudentinfo(data['studentID'],dbconnect)
    return jsonify(payload), 200

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
    notify_faculty('student')

    return jsonify({'message': 'Please confirm you email!'}), 200

@app.route('/apply/client', methods=['POST'])
def client_apply():
    data = request.get_json()
    applyInstance = apply()
    applyInstance.client_apply(data)
    email = data.get('email')
    verify_email(email)
    notify_faculty('client')

    return jsonify({'message': 'Please confirm you email!'}), 200

@app.route('/getProjects', methods=['POST'])
@Protector
def get_projects():
    data = request.get_json()
    projectInstance = Project()
    db_Connection = DatabaseConnection()
    payload = projectInstance.get_Projects(data['userID'], db_Connection)
    return jsonify(payload), 200

@app.route('/getApplications', methods=['POST'])
@Protector
def get_applications():
    data = request.get_json()
    applicationInstance = Application()
    db_Connection = DatabaseConnection()
    payload = applicationInstance.get_student_applications(data['userID'], db_Connection)
    return jsonify(payload), 200

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

# Notifies all faculty whenever there is a new application 
def notify_faculty(application_type):
    try:
        # Fetch faculty emails from the database
        query = "SELECT Email FROM FACULTY"
        db_Connection = DatabaseConnection()
        faculty_emails = [row[0] for row in db_Connection.select_query(query)]

        # Determine email subject and body based on application type
        if application_type == 'student':
            subject = 'New Student Application'
            body = 'A new student has applied. Please review the applications.'
        elif application_type == 'client':
            subject = 'New Client Application'
            body = 'A new client has applied. Please review the applications.'
        else:
            print('Invalid application type')
            return
        
        # Send email to each faculty member
        for email in faculty_emails:
            send_email(subject, body, email)

        print('Notification emails sent successfully!')
    except Exception as e:
        print(f'An error occurred while sending notification emails: {e}')

def send_email(subject, body, email):    
    try:
        # Email configuration
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = email

        # Connect to SMTP server and send email
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, email, msg.as_string())

        print(f'Email sent to {email}')
    except Exception as e:
        print(f'Failed to send email to {recipient}: {e}')

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
