import decimal
from flask import request, jsonify
import json
import pandas as pd
import uuid
from connectDB import DatabaseConnection
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

    def client_apply(self,data):
        print(data)
        
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
        due_date = data.get('dueDate')
        curious = data.get('curious')
        comment = data.get('comment')

        hashedPass = self.hash(password)

        client_id = uuid.uuid3(uuid.NAMESPACE_OID, email)
        company_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name)
        
        vals_login = [ email, hashedPass, 'Client']
        DatabaseConnection().send_insert(vals_login, 'LOGIN_INFORMATION')
        print("Login info inserted")
        
        vals_client = [client_id, f_name, l_name, email, phone_number, 'In Review', 1]
        DatabaseConnection().send_insert(vals_client, 'CLIENT')
        print("Client info inserted")
        
        vals_company = [company_id, client_id, org_name, org_type, url, revenue, num_of_IT, sen_data, sra, curious, comment, 'In Review']
        DatabaseConnection().send_insert(vals_company, 'COMPANY')
        print ("Company info inserted")
        
        project_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name + project_type + str(datetime.datetime.now()))
        vals_project = [project_id, org_name, company_id, client_id, None, project_type, due_date, datetime.datetime.now(), sen_data , 'In Review']
        DatabaseConnection().send_insert(vals_project, 'PROJECT')
        print("Project info inserted")
        
        query = "SELECT * FROM LOGIN_INFORMATION"
        data = DatabaseConnection().select_query(query)
        print(data)
        query = "SELECT * FROM CLIENT"
        data = DatabaseConnection().select_query(query)
        print(data)
        query = "SELECT * FROM COMPANY"
        data = DatabaseConnection().select_query(query)
        print(data)
        query = "SELECT * FROM PROJECT"
        data = DatabaseConnection().select_query(query)
        print(data)

        
    def student_apply(self, data):
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
        grad_date = pd.to_datetime(data.get('gradDate'))
        course_taken = data.get('courseTaken')
        when = data.get('firstHear')
        hear = data.get('hear')
        eth = data.get('eth')
        gen = data.get('gen')

        hashedPass = self.hash(password)
        id = uuid.uuid3(uuid.NAMESPACE_OID, email)
        
        CSEC390 = 0
        CSEC490 = 0
        CSEC488 = 0
        IS486 = 0
        IS487 = 0
        ACC374 = 0
        ACC376 = 0
        ACC378 = 0
        ACC636 = 0
        ACC638 = 0
        ACC639 = 0
        FIN362 = 0
        SEV621 = 0
        SEC_DAEMONS = 0
        WICYS = 0
        
        if 'CSEC_390' in course_taken:
            CSEC390 = 1
        if 'CSEC_490' in course_taken:
            CSEC490 = 1
        if 'CSEC_488' in course_taken:
            CSEC488 = 1
        if 'IS_486' in course_taken:
            IS486 = 1
        if 'IS_487' in course_taken:
            IS487 = 1
        if 'ACC_374' in course_taken:
            ACC374 = 1
        if 'ACC_376' in course_taken:
            ACC376 = 1
        if 'ACC_378' in course_taken:
            ACC378 = 1
        if 'ACC_636' in course_taken:
            ACC636 = 1
        if 'ACC_638' in course_taken:
            ACC638 = 1
        if 'ACC_639' in course_taken:
            ACC639 = 1
        if 'FIN_362' in course_taken:
            FIN362 = 1
        if 'SEV_621' in course_taken:
            SEV621 = 1
        if 'SEC_DAEMONS' in course_taken:
            SEC_DAEMONS = 1
        if 'WICYS' in course_taken:
            WICYS = 1
    
        vals_login = [ email, hashedPass, 'Student']
        DatabaseConnection().send_insert(vals_login, 'LOGIN_INFORMATION')
        print("Login info inserted")
        vals_student = [id, f_name, l_name, email, phone_number, school, major, year_standing, grad_date, project_type, hear, when, gen, eth, 'Student', 'In Review', 0]
        DatabaseConnection().send_insert(vals_student, 'STUDENT')
        print("Student info inserted")
        vals_courses = [id , CSEC390, CSEC490, CSEC488, IS486, IS487, ACC374, ACC376, ACC378, ACC636, ACC638, ACC639, FIN362, SEV621, SEC_DAEMONS, WICYS]
        DatabaseConnection().send_insert(vals_courses, 'STUDENT_CLASS')
        print("Student Class inserted")
            
        query = "SELECT * FROM LOGIN_INFORMATION"
        data = DatabaseConnection().select_query(query)
        print(data)
        query = "SELECT * FROM STUDENT"
        data = DatabaseConnection().select_query(query)
        print(data)
        query = "SELECT * FROM STUDENT_CLASS"
        data = DatabaseConnection().select_query(query)
        print(data)
    
    def faculty_apply(self, data):
        print(data)
        f_name = data.get('F_Name')
        l_name = data.get('L_Name')
        email = data.get('Email')
        password = data.get('password')
        phone_number = data.get('P_Number')
        role = data.get('Role')
        print("Role: {}".format(role))
        hashedPass = self.hash(password)
        id = uuid.uuid3(uuid.NAMESPACE_OID, email)

        try:
            vals_login = [email, hashedPass, 'Faculty']
            DatabaseConnection().send_insert(vals_login, 'LOGIN_INFORMATION')
            print("Login info inserted")
            vals_faculty = [id, f_name, l_name, email, phone_number, role, 'In Review']
            DatabaseConnection().send_insert(vals_faculty, 'FACULTY')
            print("Faculty info inserted")
        except Exception as e:
            DatabaseConnection().rollback()
            print(f"An error occurred: {e}")

    def propose_project(self, data):
        print (data)
        email = data.get('email')
        org_name = data.get('compName')
        url = data.get('url')
        revenue = data.get('revenue')
        num_of_IT = data.get('numOfIT')
        sen_data = data.get('senData')
        sra = data.get('sra')
        project_type = data.get('projectType')
        comment = data.get('comment')
        due_date = data.get('dueDate')

        client_id = uuid.uuid3(uuid.NAMESPACE_OID, email)
        company_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name)
        project_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name + project_type + str(datetime.datetime.now()))

        vals_project = [project_id, org_name, company_id, client_id, None, project_type, due_date, datetime.datetime.now(), sen_data , 'In Review']
        DatabaseConnection().send_insert(vals_project, 'PROJECT')
    
