from datetime import datetime, timedelta

class Project:
    def get_Projects(self, proj_ID, db_Connection):
        query = """
                SELECT *
                FROM Login_information
                WHERE Email = '{}';
                """.format(proj_ID)
        
        try:
            project_Data = db_Connection.send_query(query)

            if not project_Data:
                raise Exception(f"No project exists with ID: {proj_ID}")

            payload = {
                'message': 'Project Successfully Retrieved!',
                'proj_name': project_Data['C_Name'],
                'status': project_Data['Status'],
                'stu_lead': project_Data['Stu_Lead_ID'],
                'exp': 100 # datetime.utcnow() + timedelta(hours=16)
            }
            return payload
        except Exception as e:
            print(e)
            return None
