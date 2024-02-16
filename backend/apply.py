from flask import request, jsonify
import json
import pandas as pd
import uuid
import bcrypt
import datetime
from sqlalchemy import insert, MetaData, Table, update
from connectDB import DatabaseConnection


class apply:

    engine = None

    def hash(self,password):
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

    # def __init__(self):
        # self.engine = eng
        # self.metadata = MetaData()
        # self.login_information = Table('Login_information', self.metadata, autoload_with=self.engine)
        # self.company = Table('Company', self.metadata, autoload_with=self.engine)
        # self.clients = Table('Client', self.metadata, autoload_with=self.engine)

    def client_apply(self,data):
        
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

        hashedPass = self.hash(password)



        id = uuid.uuid3(uuid.NAMESPACE_OID, email)

        vals_login = [ email, hashedPass, 'Client', 1]
        DatabaseConnection().send_insert(vals_login, 'Login_information')
        print("Login info inserted")
        vals_company = [id, org_name, org_type, phone_number, url, revenue, num_of_IT, sen_data, sra, project_type, curious, comment]
        DatabaseConnection().send_insert(vals_company, 'Company')
        print ("Company info inserted")
        vals_client = [id, email, f_name, l_name, id, 'Client']
        DatabaseConnection().send_insert(vals_client, 'Client')
        return "Application submitted!"
        
    def student_apply(self, data):

        f_name = data.get('fName')
        l_name = data.get('lName')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('pNumber')
        project_type = data.get('projectType')
        school = data.get('school')
        major = data.get('major')
        year_standing = data.get('yearStanding')
        grad_date = pd.to_datetime(data.get('gradDate'))
        course_taken = data.get('courseTaken')
        when = data.get('firstHear')
        hear = data.get('hear')
        eth = data.get('eth')
        gen = data.get('gen')

        hashedPass = self.hash(password)
        id = uuid.uuid3(uuid.NAMESPACE_OID, email)

        vals_login = [ email, hashedPass, 'Student', 0]
        DatabaseConnection().send_insert(vals_login, 'Login_information')
        print('1')
        vals_student = [id, email, l_name, f_name, school, phone_number, major, 0 , None, hear, grad_date, 'Student' , year_standing, gen, eth, when]
        DatabaseConnection().send_insert(vals_student, 'Student')
        print('2')

        vals_student_class_completion = {
        'S_id' : id,
        'CSEC_390' : 0,
        'CSEC_490' : 0,
        'CSEC_488' : 0,
        'IS_486' : 0,
        'ACC_374' : 0,
        'ACC_376' : 0,
        'ACC_378' : 0,
        'ACC_636' : 0,
        'ACC_638' : 0,
        'ACC_639' : 0,
        'FIN_362' : 0,
        'SEV_621' : 0,
        #'SEC_DAEMONS' : 0,
        #'WICYS = 0' : 0
        }

        for course in course_taken:
            if course.upper() in vals_student_class_completion:
                vals_student_class_completion[course.upper()] = 1

        DatabaseConnection().send_insert(vals_student_class_completion, 'Student_class_completion')
        print('3')
        return "Application submitted!"



    
