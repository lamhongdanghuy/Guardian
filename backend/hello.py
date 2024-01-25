from flask import Flask
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    print ("Got Request")
    return json.dumps("Hello World - From the Backend")

if __name__ == "__main__":
    app.run()

#Runs on localhost:5000