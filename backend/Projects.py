from datetime import datetime, timedelta


class Project:
    def get_Projects(self, Client_ID, db_Connection):
        if not Client_ID:
            query = """
                SELECT *
                FROM PROJECT;
                """
        else:
            query = """
                SELECT *
                FROM PROJECT
                WHERE Client_ID = '{}';
                """.format(Client_ID)
        
        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Projects not found', 'projects': []}
        else:
            payload = {'message': 'Projects Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def get_proposals(self, db_Connection):
        query = """
            SELECT *
            FROM PROJECT
            WHERE Status = "In Review";
            """

        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Proposals not found', 'projects': []}
        else:
            payload = {'message': 'Proposals Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def get_student_projects(self, Student_ID, db_Connection):
        query = """
            SELECT *
            FROM PROJECT_PARTICIPANT
            WHERE Student_ID = '{}';
            """.format(Student_ID)
        
        query = """
            SELECT *
            FROM PROJECT_PARTICIPANT;
            """
        
        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Projects not found', 'projects': []}
        else:
            payload = {'message': 'Projects Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    