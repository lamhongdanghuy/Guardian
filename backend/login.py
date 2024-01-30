from flask import Flask, request, jsonify

app = Flask(__name__)

users = {
    'user1': {'password': 'password1', 'email': 'user1@example.com'}
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    identifier = data.get('identifier')  # Use 'identifier' instead of 'username'
    password = data.get('password')

    for user, user_info in users.items():
        if (user_info['email'] == identifier or user == identifier) and user_info['password'] == password:
            return jsonify({'message': 'Login successful!', 'email': user_info['email']})

    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run
