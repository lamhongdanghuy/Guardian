from flask import jsonify
from DatabaseTables import DataBase

class Application:
    def get_student_applications(self, db_Connection):
        # Query to get all students in review
        query = """
            SELECT *
            FROM {}
            WHERE {} = "In Review";
            """.format(DataBase.STUDENT.tableName(), DataBase.STUDENT.STUDENT_Status())
        
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
            UPDATE {}
            SET {} = "Active"
            WHERE {} = "{}";
            """.format(DataBase.STUDENT.tableName(),DataBase.STUDENT.STUDENT_Status(), DataBase.STUDENT.STUDENT_Student_ID(), student_ID)
        db_Connection.update_query(query)
        return jsonify({"message": "Application approved"})


    
    def rejectApplication(self, db_Connection, student_ID):
        #Get Student Email
        get_student_email_query = """
            SELECT {}
            FROM {}
            WHERE {} = "{}";
            """.format(DataBase.STUDENT.STUDENT_Email(), DataBase.STUDENT.tableName(), DataBase.STUDENT.STUDENT_Student_ID(),student_ID)
        student_email = db_Connection.select_query(get_student_email_query).at[0, 'Email']
        
        # Query to remove related records from PROJECT_PARTICIPANT table
        delete_project_participant_query = """
            DELETE FROM {}
            WHERE {} = "{}";
            """.format(DataBase.PROJECT_PARTICIPANT.tableName(), DataBase.PROJECT_PARTICIPANT.PROJECT_PARTICIPANT_Student_ID(), student_ID)
        db_Connection.update_query(delete_project_participant_query)
            
        #Query to remove related records from STUDENT_CLASS table
        delete_student_class_query = """
            DELETE FROM {}
            WHERE {} = "{}";
            """.format(DataBase.STUDENT_CLASS.tableName(), DataBase.STUDENT_CLASS.STUDENT_CLASS_Student_ID(), student_ID)
        db_Connection.update_query(delete_student_class_query)
    
    # Query to remove the student from the database
        delete_student_query = """
            DELETE FROM {}
            WHERE {} = "{}";
            """.format(DataBase.STUDENT.tableName(), DataBase.STUDENT.STUDENT_Student_ID(), student_ID)
        db_Connection.update_query(delete_student_query)
        
        print("The email to be deleted:'{}'".format(student_email))########
        delete_student_login_query = """
            DELETE FROM LOGIN_INFORMATION
            WHERE Email = "{}";
            """.format(DataBase.LOGIN_INFORMATION.tableName(), DataBase.LOGIN_INFORMATION.LOGIN_INFORMATION_Email(), student_email)
        db_Connection.update_query(delete_student_login_query)
        return jsonify({"message": "Application rejected"})