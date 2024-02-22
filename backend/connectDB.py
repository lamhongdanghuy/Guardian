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
        current_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(current_dir)
        self.filename = os.path.join(parent_dir, 'DePaul-Guardian-Clinic.pem')
        return self.filename
        
    def create_tunnel(self):
        filename = self.get_pem()
        mypkey = paramiko.RSAKey.from_private_key_file(filename, password=None)
        self.tunnel = SSHTunnelForwarder((self.ssh_host, self.ssh_port), ssh_username=self.ssh_username, ssh_pkey=mypkey, remote_bind_address=(self.localhost, self.db_port))
        self.tunnel.start()

    def get_pem(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(current_dir)
        self.filename = os.path.join(parent_dir, 'DePaul-Guardian-Clinic.pem')
        return self.filename
        
    def create_tunnel(self):
        filename = self.get_pem()
        mypkey = paramiko.RSAKey.from_private_key_file(filename, password= None)
        self.tunnel = SSHTunnelForwarder((self.ssh_host, self.ssh_port), ssh_username=self.ssh_username, ssh_pkey=mypkey, remote_bind_address=(self.localhost, self.db_port))
        self.tunnel.start()

    def close_tunnel(self):
        self.tunnel.close()

    def generate_engine(self):
        self.local_bind_port = int(self.tunnel.local_bind_port)
        self.engine = create_engine(f'mysql+pymysql://{self.db_username}:{self.db_password}@{self.localhost}:{self.local_bind_port}/{self.db_name}')
        self.Session = sessionmaker(bind=self.engine)

    def start_connection(self):
        self.create_tunnel()
        self.generate_engine()
        self.session = self.Session()
        
    def send_insert(self, values, table):
        self.start_connection()
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
        self.start_connection()
        data = pd.read_sql_query(query, self.engine)
        self.close_tunnel()
        return data
    
    def send_insert(self, values, table):
        self.start_connection()
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
        query = targetTable.insert().values(values)
        with self.engine.connect() as con:
            result = con.execute(query)
            con.commit()
            con.close()
        self.close_tunnel()
        return result
    
