from flask import request, jsonify
import json
import pandas as pd
import uuid
from connectDB import DatabaseConnection
import bcrypt
from sqlalchemy import insert, MetaData, Table, create_engine


class apply:

    engine = None

    def hash(self,password):
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

    def __init__(self,eng):
        self.engine = DatabaseConnection()


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
        stmt1 = """INSERT INTO Login_information (Email, Pass_word, Account_Type, Approved) VALUES ("{}", "{}", "Client", 0)""".format(email,hashedPass)
        stmt2 = """INSERT INTO Company (Company_id, C_name, C_type, Phone_number, C_url, revenue, numeber_of_IT, sen_Data, Last_SRA, Project_type, How_you_heard, additional_comments)VALUES ('{}', '{}', '{}', '{}', '{}', {}, {}, '{}', '{}', '{}', '{}', '{}')""".format(id, org_name, org_type, phone_number, url, revenue, num_of_IT, sen_data, sra, project_type, curious, comment)
        stmt3 = """INSERT INTO Client (Client_id, Email, First_Name, Last_Name, Project_role, Company_working_with)VALUES ('{}', '{}', '{}', '{}', '{}', '{}')""".format(id, email, f_name, l_name, project_type, id)
        stmt4 = "SELECT * FROM Login_information"
        self.engine.insert_query(stmt1)
        self.engine.insert_query(stmt2)
        self.engine.insert_query(stmt3)
        result = self.engine.select_query(stmt4)
        print(result)

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
        grad_date = data.get('gradDate')
        course_taken = data.get('courseTaken')
        curious = data.get('curious')
        hear = data.get('hear')
        eth = data.get('eth')
        gen = data.get('gen')

        return "Application submitted!"




    
