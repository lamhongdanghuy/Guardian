from login import Login
from apply import apply
from flask import Flask, request, jsonify
from flask_cors import CORS


def login():
    loginInstance = Login()
    return loginInstance.login()

def client_apply():
    applyInstance = apply()
    return applyInstance.client_apply()

def student_apply():
    applyInstance = apply()
    return applyInstance.student_apply()


if __name__ == "__main__":
    app = Flask(__name__)
    
    CORS(app)
    
    app.route('/login', methods=['POST'])(login)
    app.route('/apply/client', methods=['POST'])(client_apply)
    app.route('/apply/student', methods=['POST'])(student_apply)
    app.run()
