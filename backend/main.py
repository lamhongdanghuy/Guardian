# Standard library imports
import datetime
import json
import os
import sys
from os.path import expanduser
import uuid

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
from Students import Students
from ManageTable import ManageTable
import smtplib
from email.mime.text import MIMEText

# Local application imports
from Projects import Project
from Applications import Application
from login import Login
from apply import apply
from protector import Protector
from connectDB import DatabaseConnection
from proposal import proposal
import infoGetter
from infoGetter import infoGetter
# from protector import Protector
# Test imports 
from protector import TestProtectorDecorator

app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)

print(apply().hash('Abc123123!'))

# query = "SELECT F_Name FROM STUDENT WHERE Student_ID = '1e919b57-21b1-3c03-aaba-1221a271b79a'"
# data = DatabaseConnection().select_query(query).at[0, 'F_Name']

# query = "SELECT * FROM LOGIN_INFORMATION"
# data = DatabaseConnection().select_query(query)
# print(data)


#SMTP server configuration
smtp_server = 'smtp.gmail.com'
smtp_port = 465
sender_email = 'phuonghaodinh2002@gmail.com'
password = 'snmz oioc xwoa nvhp'

#Create URLSafeTimedSerializer object
s = URLSafeTimedSerializer(app.config['SECRET KEY'])

@app.route('/approveProposal', methods=['POST'])
def approveProposal():
    data = request.get_json()
    print(data)
    proposal_ID = data['ProposalID']
    leader_email = data.get('leaderEmail')
    students = data.get('assigned_students')
    approve = proposal()
    respone = approve.approve_proposal(proposal_ID['proposalID'], leader_email, students)
    return respone, 200

@app.route('/rejectProposal', methods=['POST'])
def rejectProposal():
    data = request.get_json()
    proposal_ID = data['ProposalID']
    reject = proposal()
    respone = reject.reject_proposal(proposal_ID['proposalID'])
    return respone, 200

@app.route('/rejectProject', methods=['POST'])
def rejectProject():
    data = request.get_json()
    project_ID = data['projectID']
    reject = Project()
    respone = reject.reject_Project(project_ID, DatabaseConnection())
    return respone, 200

@app.route('/doneProject', methods=['POST'])
def doneProject():
    data = request.get_json()
    project_ID = data['projectID']
    reject = Project()
    respone = reject.done_Project(project_ID, DatabaseConnection())
    return respone, 200

@app.route('/proposalInfo', methods=['POST'])
def proposalInfo():
    data = request.get_json()
    proposal_ID = data['ProposalID']
    get_Info = proposal()
    respone = get_Info.get_proposal_info(proposal_ID['proposalID'])
    return respone, 200

@app.route('/projectInfo', methods =['POST'])
def project_info_get():
    data = request.get_json()
    dbconnect = DatabaseConnection()
    infoInstance = infoGetter()
    id = data['projectID']['projectID']
    print(id)
    payload = infoInstance.getprojectinfo(id,dbconnect)
    # print(payload)
    return jsonify(payload), 200

@app.route('/project/updateProject', methods=['POST'])
def updateProject():
    data = request.get_json()
    print(data)
    update = Project()
    respone = update.update_Project(data, DatabaseConnection())
    return respone, 200

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

@app.route('/apply/faculty', methods=['POST'])
def faculty_apply():
    data = request.get_json()
    email = data.get('Email')

    applyInstance = apply()
    if applyInstance.email_exists(email):
        return jsonify({'message': 'Email already taken'}), 400

    applyInstance.faculty_apply(data)
    verify_email(email)

    return jsonify({'message': 'Please confirm your email!'}), 200

@app.route('/apply/student', methods=['POST'])
def student_apply():
    data = request.get_json()
    email = data.get('email')

    applyInstance = apply()
    if applyInstance.email_exists(email):
        return jsonify({'message': 'Email already taken'}), 400

    applyInstance.student_apply(data)
    verify_email(email)
    notify_faculty('student')

    return jsonify({'message': 'Please confirm your email!'}), 200

@app.route('/apply/client', methods=['POST'])
def client_apply():
    data = request.get_json()
    email = data.get('email')

    applyInstance = apply()
    if applyInstance.email_exists(email):
        return jsonify({'message': 'Email already taken'}), 400

    applyInstance.client_apply(data)
    verify_email(email)
    notify_faculty('client')

    return jsonify({'message': 'Please confirm your email!'}), 200

@app.route('/getProjects', methods=['POST'])
@Protector
def get_projects():
    data = request.get_json()
    role = data['role']
    print ("role " + role)
    projectInstance = Project()
    db_Connection = DatabaseConnection()
    if role == 'Student':
        payload = projectInstance.get_student_projects(data['userID'], db_Connection)
    else:
        payload = projectInstance.get_Projects(data['userID'], db_Connection)
    return jsonify(payload), 200

@app.route('/rejectStudent', methods=['POST'])
def rejectApplication():
    data = request.get_json()
    applicationInstance = Application()
    db_Connection = DatabaseConnection()
    payload = applicationInstance.rejectApplication(db_Connection, data['studentID']['studentID'])
    return payload, 200

@app.route('/approveStudent', methods=['POST'])
def approveApplication():
    data = request.get_json()
    print(data)
    applicationInstance = Application()
    db_Connection = DatabaseConnection()
    payload = applicationInstance.approveApplication(db_Connection, data['studentID']['studentID'])
    return payload, 200

@app.route('/getApplications', methods=['POST'])
@Protector
def get_applications():
    data = request.get_json()
    applicationInstance = Application()
    db_Connection = DatabaseConnection()
    payload = applicationInstance.get_student_applications(db_Connection)
    return jsonify(payload), 200

@app.route('/getProposals', methods=['POST'])
@Protector
def get_proposals():
    data = request.get_json()
    proposalInstance = Project()
    db_Connection = DatabaseConnection()
    payload = proposalInstance.get_proposals(db_Connection)
    return jsonify(payload), 200

@app.route('/dashboard/resend-verification-link', methods=['POST'])
@Protector
def resend_verification_link():
    hit = {'message': 'Hit'}
    token = jwt.encode(hit, app.config["SECRET KEY"])
    return jsonify(token)


@app.route('/addStudent', methods=['POST'])
@Protector
def add_student():
    data = request.get_json()
    payload = 0
    studentID = data['student'].get('Student_ID')
    projectID = data['projectID'].get('projectID')
    db_Connection = DatabaseConnection()
    infoInstance = infoGetter()
    payload = infoInstance.add_student(studentID, projectID, db_Connection)
    payload = 1
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
        query = "SELECT Email FROM FACULTY WHERE Role = 'Admin Assistant' OR Role = 'Clinic Director'"
        db_Connection = DatabaseConnection()
        result = db_Connection.select_query(query)
        faculty_emails = result['Email'].tolist()
        print(faculty_emails)

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
        print(f'Failed to send email to {email}: {e}')

@app.route('/confirm_email/<token>')
def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
        query = "UPDATE LOGIN_INFORMATION SET Email_Verified = 1 WHERE email = '{}'".format(email)
        DatabaseConnection().update_query(query)
    except SignatureExpired:
        return '<h1>The token is expired!</h1>'
    return '<h1>The email is confirmed!</h1>'

@app.route('/propose', methods=['POST'])
def propose_project():
    data = request.get_json()
    applyInstance = apply()
    applyInstance.add_project(data)
    return jsonify({'message': 'Project proposed!'}), 200

@app.route('/getFacultyTable', methods=['GET'])
def getFacultyTable():
    payload = ManageTable.getTable('FACULTY')
    return jsonify(payload), 200

@app.route('/getStudentTable', methods=['GET'])
def getStudentTable():
    payload = ManageTable.getTable('STUDENT')
    return jsonify(payload), 200

@app.route('/getProjectTable', methods=['GET'])
def getProjectTable():
    payload = ManageTable.getTable('PROJECT')
    return jsonify(payload), 200

@app.route('/getClientTable', methods=['GET'])
def getClientTable():
    payload = ManageTable.getTable('CLIENT')
    return jsonify(payload), 200

@app.route('/getCompanyTable', methods=['GET'])
def getCompanyTable():
    payload = ManageTable.getTable('COMPANY')
    return jsonify(payload), 200

@app.route('/getLoginTable', methods=['GET'])
def getLoginTable():
    payload = ManageTable.getTable('LOGIN_INFORMATION')
    return jsonify(payload), 200

@app.route('/getStudentClassTable', methods=['GET'])
def getStudentClassTable():
    payload = ManageTable.getTable('STUDENT_CLASS')
    return jsonify(payload), 200

@app.route('/getProjectParticipantTable', methods=['GET'])
def getProjectParticipantTable():
    payload = ManageTable.getTable('PROJECT_PARTICIPANT')
    return jsonify(payload), 200

@app.route('/getStudents', methods=['POST'])
def getStudents():
    studentsInstace = Students()
    db_Connection = DatabaseConnection()
    payload = studentsInstace.get_students(db_Connection)
    return jsonify(payload), 200

if __name__ == "__main__":
    app.run(debug=True)
