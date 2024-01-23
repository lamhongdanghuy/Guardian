import json
from flask import Flask,render_template, request
from flask_cors import CORS

class data:
    def __init__(self, name, url):
        self.name = name
        self.url = url

    def __repr__(self):
        return f"Name: {self.name}, URL: {self.url}"

    def to_json(self):
        return json.dumps(self.__dict__)

app = Flask(__name__)
CORS(app)
master_data = data("Hello World","From the backend!")

@app.route("/")
def helloworld():
    return "Hello World"

@app.route("/send_data", methods=['POST'])
def send_data():
    if request.method == 'POST':
        data = request.get_json()

        response_data = {'status': 'success'}
        master_data.name = data['name']
        master_data.url = data['url']
        print(response_data)
        return json.dumps(response_data)

@app.route("/get_data")
def getdata():
    data = {
        'name' : 'Back End',
        'url' : 'This is from the backend!'
    }
    return json.dumps(master_data.__dict__)

if __name__ == "__main__":
    app.run()