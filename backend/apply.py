# Contributors: Albert Luna, Hong Lam, Christian Riviera, Joel Chamakala

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
        # Hashes passwords with a salt
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password
    
    def email_exists(self, email):
        query = "SELECT COUNT(*) as count FROM LOGIN_INFORMATION WHERE Email = '{}'".format(email)
        print("Executing query:", query)  # Debugging statement
        result = DatabaseConnection().select_query(query)
        print("Query result:", result)   # Debugging statement
        return result['count'].iloc[0] > 0
        
    def client_apply(self,data):
        print(data)
        # puts each piece od fata from received dictionary into a coressponding variable
        f_name = data.get('fName')
        l_name = data.get('lName')
        email = data.get('email')
        email = email.lower()
        if self.email_exists(email):
            return jsonify({'message': 'Email already exists'}), 400
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
        # Creates Id for company and client
        client_id = uuid.uuid3(uuid.NAMESPACE_OID, email)
        company_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name)
        # Each block inserts the information into the relevant table in the database
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


        
    def student_apply(self, data):
        print(data)
        # puts each piece od fata from received dictionary into a corresponding variable
        f_name = data.get('fName')
        l_name = data.get('lName')
        email = data.get('email')
        if self.email_exists(email):
            return jsonify({'message': 'Email already exists'}), 400
        password = data.get('password')
        phone_number = data.get('pNumber')
        project_type = data.get('projectType')
        school = data.get('school')
        major = data.get('major')
        year_standing = data.get('yearStanding')
        grad_date = pd.to_datetime(data.get('gradDate'))
        course_taken = data.get('selectedCourses')
        curious = data.get('curious')
        whenHear = data.get('hear')
        eth = data.get('eth')
        gen = data.get('gen')

        hashedPass = self.hash(password)
        # Creates Id for student
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

        # Each block inserts the information into the relevant table in the database
        vals_login = [ email, hashedPass, 'Student']
        DatabaseConnection().send_insert(vals_login, 'LOGIN_INFORMATION')
        print("Login info inserted")
        vals_student = [id, f_name, l_name, email, phone_number, school, major, year_standing, grad_date, project_type, curious, whenHear, gen, eth, 'Student', 'In Review', 0]
        DatabaseConnection().send_insert(vals_student, 'STUDENT')
        print("Student info inserted")
        vals_courses = [id , CSEC390, CSEC490, CSEC488, IS486, IS487, ACC374, ACC376, ACC378, ACC636, ACC638, ACC639, FIN362, SEV621, SEC_DAEMONS, WICYS]
        DatabaseConnection().send_insert(vals_courses, 'STUDENT_CLASS')
        print("Student Class inserted")
    
    def faculty_apply(self, data):
        print(data)
        # puts each piece od fata from received dictionary into a corresponding variable
        f_name = data.get('F_Name')
        l_name = data.get('L_Name')
        email = data.get('Email')
        if self.email_exists(email):
            return jsonify({'message': 'Email already exists'}), 400
        password = data.get('password')
        phone_number = data.get('P_Number')
        role = data.get('role')
        hashedPass = self.hash(password)
        id = uuid.uuid3(uuid.NAMESPACE_OID, email)

        vals_login = [email, hashedPass, 'Faculty']
        # Each block inserts the information into the relevant table in the database
        DatabaseConnection().send_insert(vals_login, 'LOGIN_INFORMATION')
        print("Login info inserted")
        vals_faculty = [id, f_name, l_name, email, phone_number, role, 'Active']
        DatabaseConnection().send_insert(vals_faculty, 'FACULTY')
        print("Faculty info inserted")
    
     #adds new project to PROJECT table to in review. Similar to client_apply except client proposes a new project with them already assigned. Updates company table with new info
    def add_project(self, data):
        client_id = data.get('clientID')
        query_id = """SELECT Company_ID FROM COMPANY
                    WHERE Client_ID = "{}" """.format(client_id)
        
        company_id_data = DatabaseConnection().select_query(query_id)
        print(company_id_data)
        company_id = company_id_data.at[0, 'Company_ID']

        
        org_name = data.get('compName')
        org_type = data.get('compType')
        url = data.get('url')
        revenue = data.get('revenue')
        num_of_IT = data.get('numOfIT')
        sen_data = data.get('senData')
        sra = data.get('sra')
        project_type = data.get('projectType')
        comment = data.get('comment')
        date_submitted = datetime.datetime.now()

        project_id = uuid.uuid3(uuid.NAMESPACE_OID, org_name + project_type + str(date_submitted))

        update_query = """UPDATE COMPANY
                        SET C_URL = '{}',
                            C_Revenue = {},
                            C_IT = {},
                            C_SRA = '{}',
                            Comment = '{}'
                        WHERE Client_ID = "{}" """.format( url, revenue, num_of_IT, sra, comment, client_id)
        try:
            vals_new_project = [project_id, org_name, company_id, client_id, None, project_type, datetime.date(1990,1,1), date_submitted, sen_data, "In Review"]
            DatabaseConnection().send_insert(vals_new_project, 'PROJECT')
            DatabaseConnection().update_query(update_query)
            payload = {"message": "Project proposed!"}
        except Exception as e:
            print(f"An error occurred: {e}")
            payload = {"message": "Error proposing project"}
        return payload



    
