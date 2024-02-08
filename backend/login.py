from flask import Flask, request, jsonify
from datetime import datetime, timedelta

from flask_cors import CORS
import json
import jwt

class Login:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SECRET_KEY'] =  '1234'
        CORS(self.app)

        self.users = {
            'user1': {'password': 'password1', 'email': 'user1@example.com', 'role': 'student', 'id' : 0 },
            'user2': {'password': 'password2', 'email': 'user2@example.com', 'role': 'faculty', 'id' : 1 },
            'user3': {'password': 'password3', 'email': 'user3@example.com', 'role': 'client', 'id' : 2 }


        }

        self.app.route("/")(self.hello)
        self.app.route('/login', methods=['POST'])(self.login)
        self.app.route('/apply/client', methods=['POST'])(self.client_apply)
        self.app.route('/apply/student', methods=['POST'])(self.student_apply)

    def run_app(self):
        self.app.run()

    def hello(self):
        print("Got Request")
        return json.dumps("Hello World - From the Backend")

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

                payload = {'message': 'Login successful!', 
                           'email': user_info['email'], 
                           'role': user_info['role'], 
                           'id': user_info['id'],
                           'exp': datetime.utcnow() + timedelta(hours=16)}
                token = jwt.encode(payload, self.app.config['SECRET_KEY'], )
                
                return jsonify(token)
            
        
        
        print("Login Failed")
        return jsonify({'message': 'Invalid credentials'}), 401


    def client_apply(self):
        data = request.get_json()
        
        f_name = data.get('fName')
        l_name = data.get('lName')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('pNumber')
        org_name = data.get('compName')
        org_type = data.get('compType')
        url = data.get('url')
        revenue = data.get('revenue')
        num_of_IT = data.get('numOfIT')
        sen_data = data.get('senData')
        sra = data.get('sra')
        project_type = data.get('projectType')
        curious = data.get('curious')
        comment = data.get('comment')

        return jsonify({'message': 'Application submitted!'})

    def student_apply(self):
        data = request.get_json()
        print(data)
        f_name = data.get('fName')
        l_name = data.get('lName')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('pNumber')
        project_type = data.get('projectType')
        school = data.get('school')
        major = data.get('major')
        year_standing = data.get('yearStanding')
        grad_date = data.get('gradDate')
        course_taken = data.get('courseTaken')
        curious = data.get('curious')
        hear = data.get('hear')
        eth = data.get('eth')
        gen = data.get('gen')

        return jsonify({'message': 'Application submitted!'})
