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
        #Get Student Email
        get_student_email_query = """
            SELECT Email
            FROM STUDENT
            WHERE Student_ID = "{}";
            """.format(student_ID)
        student_email = db_Connection.select_query(get_student_email_query).at[0, 'Email']
        
        # Query to remove related records from PROJECT_PARTICIPANT table
        delete_project_participant_query = """
            DELETE FROM PROJECT_PARTICIPANT
            WHERE Student_ID = "{}";
            """.format(student_ID)
        db_Connection.update_query(delete_project_participant_query)
            
        #Query to remove related records from STUDENT_CLASS table
        delete_student_class_query = """
            DELETE FROM STUDENT_CLASS
            WHERE Student_ID = "{}";
            """.format(student_ID)
        db_Connection.update_query(delete_student_class_query)
    
    # Query to remove the student from the database
        delete_student_query = """
            DELETE FROM STUDENT
            WHERE Student_ID = "{}";
            """.format(student_ID)
        db_Connection.update_query(delete_student_query)
        
        delete_student_login_query = """
            DELETE FROM LOGIN_INFORMATION
            WHERE Email = "{}";
            """.format(student_email)
        
        return jsonify({"message": "Application rejected"})