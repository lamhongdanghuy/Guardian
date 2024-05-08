#Contributor: Hong Lam, Joel Chamakala, and Albert Luna

#Hong Lam: Base Code 80%
#Albert Luna: Compatibility refactor with other files 10%
#Joel Chamakala: Add Faculty Table 10%

from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text
import pandas as pd

class DatabaseConnection: 
    def __init__(self):
        self.db_host = 'localhost'
        self.db_port = 3306
        self.db_username = '' #your username
        self.db_password = '' #your password
        self.db_name = 'Guardian_CyberSecurity' #your db name
        self.metadata = MetaData()

    def generate_engine(self):
        self.engine = create_engine(f'mysql+pymysql://{self.db_username}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}')
        self.Session = sessionmaker(bind=self.engine)

    def start_connection(self):
        self.generate_engine()
        self.session = self.Session()

    def send_insert(self, values, table):
        self.start_connection()
        print("This is the table: {}".format(table))
        try:
            targetTable = Table(table, self.metadata, autoload_with=self.engine)
            query = targetTable.insert().values(values)
            self.session.execute(query)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            print(f"An error occurred: {e}")
        finally:
            self.session.close()

    def select_query(self, query):
        self.start_connection()
        data = pd.read_sql_query(query, self.engine)
        return data

    def update_query(self, query):
        self.start_connection()
        try:
            stmt = text(query)
            self.session.execute(stmt)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            print(f"An error occurred: {e}")
        finally:
            self.session.close()
