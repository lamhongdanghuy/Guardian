class Application:
    def get_student_applications(self, Student_ID, db_Connection):
        if not Student_ID:
            query = """
                SELECT *
                FROM STUDENT;
                """
        else:
            query = """
                SELECT *
                FROM STUDENT
                WHERE Student_ID = '{}';
                """.format(Student_ID)
        
        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Application not found', 'students': []}
        else:
            payload = {'message': 'Application Successfully Retrieved!',
                       'applications': projectData.to_dict(orient='records')}
        print(payload)
        return payload