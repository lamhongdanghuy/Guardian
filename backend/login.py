from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {
    'user1': {'password': 'password1', 'email': 'user1@example.com'}
}

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

if __name__ == "__main__":
    app.run()
