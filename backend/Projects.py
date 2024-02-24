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