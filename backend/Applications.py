from flask import jsonify
class Application:
    def get_student_applications(self, db_Connection):
        # Query to get all students in review
        query = """
            SELECT *
            FROM STUDENT
            WHERE Status = "In Review";
            """
        
        print(query)

        projectData = db_Connection.select_query(query)
        # Gets a pandas dataframe of all students with the status in review
        if projectData.empty:
            payload = {'message': 'Application not found', 'students': []}
        else:
            payload = {'message': 'Application Successfully Retrieved!',
                       'applications': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def approveApplication(self, db_Connection, student_ID):
        # Query to update specific student status
        query = """
            UPDATE STUDENT
            SET Status = "Active"
            WHERE Student_ID = "{}";
            """.format(student_ID)
        db_Connection.update_query(query)
        return jsonify({"message": "Application approved"})


    
    def rejectApplication(self, db_Connection, student_ID):
        # Query to update specific student status
        query = """
            UPDATE STUDENT
            SET Status = "Inactive"
            WHERE Student_ID = "{}";
            """.format(student_ID)
        db_Connection.update_query(query)
        return jsonify({"message": "Application rejected"})