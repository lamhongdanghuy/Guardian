from flask import request, jsonify
import json
import pandas as pd
import uuid
import bcrypt
from sqlalchemy import insert, MetaData, Table, create_engine


class apply:

    engine = None

    metadata = MetaData()

    login_information = Table('LOGIN_INFORMATION', metadata, autoload_with=engine)

    def hash(self,password):
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password, salt)
        return hashed_password

    def __init__(self,eng):
        self.engine = eng
        self.metadata = MetaData()
        self.login_information = Table('LOGIN_information', self.metadata, autoload_with=self.engine)

    def client_apply(self,data):
        
        f_name = data.get('fName')
        l_name = data.get('lName')
        Email = data.get('email')
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

        hashedPass = hash(password)



        id = uuid.uuid3(uuid.NAMESPACE_OID, Email)
      #  stmt = insert(user_table).values(name="spongebob", fullname="Spongebob Squarepants")
        stmt = insert(self.login_information).values(Email = Email, password = hashedPass, account_type = 'CLIENTS', approved = False)
       # query1 = f"INSERT INTO LOGIN_INFORMATION VALUES ({email}, {hashedPass}, CLIENTS, FALSE)"
        #query2 = f"INSERT INTO COMPANY VALUES ({id},{org_name}, {org_type}, {phone_number}, {url}, {revenue}, {num_of_IT}, {sen_data}, {sra}, {project_type}, {curious}, {comment})"
        #query3 = f"INSERT INTO CLIENTS VALUES ({id}, {email}, {f_name}, {l_name}, DEFAULT, {project_type})"

        with self.engine.connect() as con:
            result = con.execute(stmt)
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

        return "Application submitted!"




    
