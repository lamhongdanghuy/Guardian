class Application:
    def get_student_applications(self, db_Connection):
        query = """
            SELECT *
            FROM STUDENT
            WHERE Status = "In Review";
            """
        
        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Application not found', 'students': []}
        else:
            payload = {'message': 'Application Successfully Retrieved!',
                       'applications': projectData.to_dict(orient='records')}
        print(payload)
        return payload