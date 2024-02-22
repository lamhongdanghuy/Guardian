from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["SECRET KEY"] = "1234"
CORS(app)
