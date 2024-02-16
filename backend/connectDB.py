import os
from sshtunnel import SSHTunnelForwarder
from sqlalchemy import create_engine, Table, MetaData
import paramiko
import pandas as pd

class DatabaseConnection:
    def __init__(self):
        self.ssh_host = '18.216.233.27'
        self.ssh_username = 'ubuntu'
        self.ssh_password = None
        self.ssh_port = 22
        self.db_port = 3306
        self.db_username = 'Admin'
        self.db_password = 'Hhe^3828jsu37s92j'
        self.db_name = 'CyberSecurity'
        self.localhost = '127.0.0.1'
        self.metadata = MetaData()

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

    def start_connection(self):
        self.create_tunnel()
        self.generate_engine()
        
    def send_query(self, query):
        self.start_connection()
        data = pd.read_sql_query(query, self.engine)
        self.close_tunnel()
        return data
    
    def send_insert(self, values, table):
        self.start_connection()
        if table == 'Login_information':
            targetTable = Table('Login_information', self.metadata, autoload_with=self.engine)
        elif table == 'Company':
            targetTable = Table('Company', self.metadata, autoload_with=self.engine)
        elif table == 'Client':
            targetTable = Table('Client', self.metadata, autoload_with=self.engine)
        elif table == 'Student':
            targetTable = Table('Student', self.metadata, autoload_with=self.engine)
        elif table == 'Student_class_completion':
            targetTable = Table('Student_class_completion', self.metadata, autoload_with=self.engine)
        query = targetTable.insert().values(values)
        with self.engine.connect() as con:
            result = con.execute(query)
            con.commit()
            con.close()
        self.close_tunnel()
        return result
    
