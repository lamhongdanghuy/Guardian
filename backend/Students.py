class Students:

    def get_students(self, db_Connection):
        query = """
            SELECT *
            FROM STUDENT
            WHERE Status = "Active";
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
            SET Status = "Inactive"
            WHERE STUDENT_ID = "{}";
            """.format(student_id)
        
        db_Connection.update_query(query)
        payload = {'message': 'Inactivated Student Successfully!'}
        return payload
    
    def student_update(self, db_Connection, data):
        return