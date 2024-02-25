from flask import request, jsonify
from datetime import datetime
import pandas as pd
import uuid
import json
import jwt

#local import
from connectDB import DatabaseConnection 

class newProject:

    #adds new project to PROJECT table. Similar to client_apply except existing client is assigned to project
    def add_project(self, data, client_id):
        query = """SELECT Company_ID FROM COMPANY
                    WHERE {} = Client_ID """.format(client_id)
        company_id = DatabaseConnection().select_query(query)

        project_id = uuid.uuid3(uuid.NAMESPACE_OID, client_id)


        org_name = data.get('compName')
        #org_type = data.get('compType')
        #url = data.get('url')
        #revenue = data.get('revenue')
        #num_of_IT = data.get('numOfIT')
        sen_data = data.get('senData')
        #sra = data.get('sra')
        project_type = data.get('projectType')
        #comment = data.get('comment')
        date_submitted = datetime.today().strftime('%Y-%m-%d')

        try:
            vals_new_project = [project_type, org_name, company_id, client_id, '', project_type, '', date_submitted, sen_data, "In Review"]
            DatabaseConnection.send_insert(vals_new_project, 'PROJECT')
        except Exception as e:
            DatabaseConnection().rollback()
            print(f"An error occurred: {e}")

