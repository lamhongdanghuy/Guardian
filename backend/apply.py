from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/apply/client")
def client_apply():
    data = request.get_json()

    org_name = data.get('compName')
    org_type = data.get('compType')
    phone_number = data.get('pNumber')
    url = data.get('url')
    revenue = data.get('revenue')
    num_of_IT = data.get('numOfIT')
    sen_data = data.get('senData')
    sra = data.get('sra')
    project_type = data.get('projectType')
    curious = data.get('curious')
    comment = data.get('comment')

    print("Application submitted.")

@app.route("/apply/student")
def student_apply():
    data = request.get_json()

    name = data.get('name')
    school = data.get('school')
    major = data.get('major')
    curr_year = data.get('currentYear')
    grad_date = data.get('gradYear')
    prereq = data.get('prereq')
    project_type = data.get('projectType')
    hear = data.get('hear')
    when_hear = data.get('whenHear')
    gender = data.get('gender')
    ethnicity = data.get('ethnicity')

    print("Application submitted.")





if __name__ == "__main__":
    app.run()