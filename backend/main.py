from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

users = {
    'user1': {'password': 'password1', 'email': 'user1@example.com'}
}

@app.route("/")
def hello():
    print ("Got Request")
    return json.dumps("Hello World - From the Backend")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    identifier = data.get('email')  # Use 'identifier' instead of 'username'
    password = data.get('password')
    print(identifier)
    print(password)

    for user, user_info in users.items():
        if (user_info['password'] == password):
            print("Password Matched")
        if (user_info['email'] == identifier):
            print("Email Matched")
        if (user_info['email'] == identifier or user == identifier) and user_info['password'] == password:
            print("Login Successful")
            return jsonify({'message': 'Login successful!', 'email': user_info['email']})
        else:
            print("Login Failed")
            return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/apply/client', methods=['POST'])
def client_apply():
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

@app.route("/apply/student", methods=['POST'])
def student_apply():
    data = request.get_json()

    f_name = data.get('fName')
    l_name = data.get('lName')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('pNumber')
    project_type = data.get('projectType')
    school = data.get('school')
    major = data.get('major')
    yearStanding = data.get('yearStanding')
    grad_date = data.get('gradDate')
    curious = data.get('curious')
    hear = data.get('hear')
    eth = data.get('eth')
    gen = data.get('gen')

    return jsonify({'message': 'Application submitted!'})

if __name__ == "__main__":
    app.run()
