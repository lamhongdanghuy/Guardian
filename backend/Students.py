class Students:

    def get_students(self, db_Connection):
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
    
    def inactivate_student(self, db_Connection, student_id):
        query = """
            UPDATE STUDENT
            SET Status = "inactive"
            WHERE STUDENT_ID = {};
            """.format(student_id)
        
        projectData = db_Connection.update_query(query)
        if projectData.empty:
            payload = {'message': 'Student not found', 'students': []}
        else:
            payload = {'message': 'Inactivated Student Successfully!'}
        return payload