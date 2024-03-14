class Students:

    def get_students(self, db_Connection):
        # Gets the entire list of registered students
        query = """
            SELECT *
            FROM STUDENT;
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