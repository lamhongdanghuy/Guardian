#Contributor: Hong Lam, Joel Chamakala, and Albert Luna

#Hong Lam: Base Code 80%
#Albert Luna: Compatibility refactor with other files 10%
#Joel Chamakala: Add Faculty Table 10%

import os
from sshtunnel import SSHTunnelForwarder
from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text
import paramiko
import pandas as pd
from configparser import ConfigParser

class DatabaseConnection: 
    def __init__(self):
        # places all env variables into local variables for use
        config = ConfigParser()
        config.read('.env')
        env_vars = {section: dict(config.items(section)) for section in config.sections()}
        self.ssh_host = env_vars['SSH']['host']
        self.ssh_username = env_vars['SSH']['username']
        self.ssh_password = env_vars['SSH']['password']
        self.ssh_port = int(env_vars['SSH']['port'])
        self.db_port = int(env_vars['DB']['port'])
        self.db_username = env_vars['DB']['username']
        self.db_password = env_vars['DB']['password']
        self.db_name = env_vars['DB']['name']
        self.localhost = env_vars['LOCALHOST']['host']
        self.metadata = MetaData()

    def get_pem(self):
        # Gets the RSA key to get into the server
        current_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(current_dir)
        self.filename = os.path.join(parent_dir, 'DePaul-Guardian-Clinic.pem')
        return self.filename
        
    def create_tunnel(self):
        # SSH's into the server
        filename = self.get_pem()
        mypkey = paramiko.RSAKey.from_private_key_file(filename, password= None)
        self.tunnel = SSHTunnelForwarder((self.ssh_host, self.ssh_port), ssh_username=self.ssh_username, ssh_pkey=mypkey, remote_bind_address=(self.localhost, self.db_port))
        self.tunnel.start()

    def close_tunnel(self):
        # closes ssh tunnel
        self.tunnel.close()

    def generate_engine(self):
        # connects to sql server
        self.local_bind_port = int(self.tunnel.local_bind_port)
        self.engine = create_engine(f'mysql+pymysql://{self.db_username}:{self.db_password}@{self.localhost}:{self.local_bind_port}/{self.db_name}')
        self.Session = sessionmaker(bind=self.engine)

    def start_connection(self):
        # Connect to the database through engine
        self.create_tunnel()
        self.generate_engine()
        self.session = self.Session()
        
    def send_insert(self, values, table):
        self.start_connection()
        # Accepts the values to be inserted and uses the engine to execute an insertion with the values
        print("This is the table: {}".format(table))
        try:
            if table == 'LOGIN_INFORMATION':
                targetTable = Table('LOGIN_INFORMATION', self.metadata, autoload_with=self.engine)
            elif table == 'COMPANY':
                targetTable = Table('COMPANY', self.metadata, autoload_with=self.engine)
            elif table == 'CLIENT':
                targetTable = Table('CLIENT', self.metadata, autoload_with=self.engine)
            elif table == 'STUDENT':
                targetTable = Table('STUDENT', self.metadata, autoload_with=self.engine)
            elif table == 'STUDENT_CLASS':
                targetTable = Table('STUDENT_CLASS', self.metadata, autoload_with=self.engine)
            elif table == 'PROJECT':
                targetTable = Table('PROJECT', self.metadata, autoload_with=self.engine)
            elif table == 'FACULTY':
                targetTable = Table('FACULTY', self.metadata, autoload_with=self.engine)
            elif table == 'PROJECT_PARTICIPANT':
                targetTable = Table('PROJECT_PARTICIPANT', self.metadata, autoload_with=self.engine)
            query = targetTable.insert().values(values)
            self.session.execute(query)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            print(f"An error occurred: {e}")
        finally:
            self.session.close()
            self.close_tunnel()
        
    def select_query(self, query):
        # sends the received query into a pandas method and returns the info collected+

        self.start_connection()
        data = pd.read_sql_query(query, self.engine)
        self.close_tunnel()
        return data
    
    def update_query(self, query):
        self.start_connection()
        try:
            # Use text() to declare the SQL query explicitly
            stmt = text(query)
            self.session.execute(stmt)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            print(f"An error occurred: {e}")
        finally:
            self.close_tunnel()
