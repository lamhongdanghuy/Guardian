from flask import request, jsonify
import json
import pandas as pd
import uuid
import bcrypt
from sqlalchemy import insert, MetaData, Table, update


class apply:

    engine = None

    def hash(self,password):
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

    def __init__(self,eng):
        self.engine = eng
        self.metadata = MetaData()
        self.login_information = Table('Login_information', self.metadata, autoload_with=self.engine)
        self.company = Table('Company', self.metadata, autoload_with=self.engine)
        self.clients = Table('Client', self.metadata, autoload_with=self.engine)

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
      #  stmt = insert(user_table).values(name="spongebob", fullname="Spongebob Squarepants")
        stmt1 = insert(self.login_information).values(Email= email, Pass_word = hashedPass, Account_Type = 'Clients', Approved = 0)
        stmt2 = insert(self.company).values(Company_id = id, C_name = org_name, C_type = org_type, Phone_number = phone_number, C_url = url, revenue = revenue, numeber_of_IT = num_of_IT, sen_Data = sen_data, Last_SRA = sra, Project_type = project_type, How_you_heard = curious, additional_comments = comment)
        stmt3 = insert(self.clients).values(Client_id = id, Email = email, First_Name = f_name, Last_Name = l_name, Project_role = project_type, Company_working_with = id)
        with self.engine.connect() as con:
            result = con.execute(stmt1)
            print(result)
            con.commit()
            result = con.execute(stmt2)
            print(result)
            con.commit()
            result = con.execute(stmt3)
            print(result)
            con.commit()
            con.close()
        #self.engine.execute(query2)
        #self.engine.execute(query3)


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

        courses_offered = {
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
     #   'SEC_DAEMONS' : 0,
      #  'WICYS = 0' : 0
        }

        for course in course_taken:
            if course.upper() in courses_offered:
                courses_offered[course.upper()] = 1

        hashedPass = self.hash(password)
        stmt1 = insert(self.login_information).values(Email= email, Pass_word = hashedPass, Account_Type = 'Student', Approved = 0)
        stmt2 = insert(self.student).values(S_id = id , Email = email, First_Name = f_name, Last_Name = l_name, College = school, Degree_name = major, when_you_heard = firstHear,  Ethnicity = eth, Expected_graduation = grad_date, current_year = year_standing, Gender = gen, Phone_number = p_number, How_you_heard = hear, )
        stmt3 = insert(self.student_class_completion).values(S_id = id)
        stmt4 = update(self.student_class_completion).where(self.student_class_completion.c.S_id == id).values(courses_offered)
        with self.engine.connect() as con:
            result = con.execute(stmt1)
            print(result)
            con.commit()
            result = con.execute(stmt2)
            print(result)
            con.commit()
            result = con.execute(stmt3)
            print(result)
            con.commit()
            result = con.execute(stmt4)
            print(result)
            con.commit()
        
        return "Application submitted!"



    
