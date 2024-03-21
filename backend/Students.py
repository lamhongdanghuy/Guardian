class Students:

    def get_students(self, db_Connection):
        # Gets the entire list of registered students
        query = """
            SELECT *
            FROM STUDENT
            WHERE Status = "Active" OR Status = "Inactive";
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
        studentID = data['studentID']['studentID']
        studentFName = data['studentFName']
        studentLName = data['studentLName']
        major = data['major']
        email = data['email']
        oldEmail = data['oldEmail']
        phone = data['phone']
        projectIntrest = data['projectIntrest']
        gradDate = data['gradDate']
        year = data['year']
        college = data['college']
        course_taken = data['coursesTaken']
        role = data['role']
        
        # Define course variables and their corresponding variable names
        CSEC390 = 0
        CSEC490 = 0
        CSEC488 = 0
        IS486 = 0
        IS487 = 0
        ACC374 = 0
        ACC376 = 0
        ACC378 = 0
        ACC636 = 0
        ACC638 = 0
        ACC639 = 0
        FIN362 = 0
        SEV621 = 0
        SEC_DAEMONS = 0
        WICYS = 0
        
        if 'CSEC_390' in course_taken:
            CSEC390 = 1
        if 'CSEC_490' in course_taken:
            CSEC490 = 1
        if 'CSEC_488' in course_taken:
            CSEC488 = 1
        if 'IS_486' in course_taken:
            IS486 = 1
        if 'IS_487' in course_taken:
            IS487 = 1
        if 'ACC_374' in course_taken:
            ACC374 = 1
        if 'ACC_376' in course_taken:
            ACC376 = 1
        if 'ACC_378' in course_taken:
            ACC378 = 1
        if 'ACC_636' in course_taken:
            ACC636 = 1
        if 'ACC_638' in course_taken:
            ACC638 = 1
        if 'ACC_639' in course_taken:
            ACC639 = 1
        if 'FIN_362' in course_taken:
            FIN362 = 1
        if 'SEV_621' in course_taken:
            SEV621 = 1
        if 'Sec_Daemons' in course_taken:
            SEC_DAEMONS = 1
        if 'WiCyS' in course_taken:
            WICYS = 1

        # Update Login Information
        update_login_query = "UPDATE LOGIN_INFORMATION SET Email = '{}' WHERE Email = '{}'".format(email, oldEmail)
        db_Connection.update_query(update_login_query)

        # Update Student Information
        update_info_query = "UPDATE STUDENT SET F_Name = '{}', L_Name = '{}', Major = '{}', Email = '{}', P_Number = '{}', Proj_Interest = '{}', Grad_Date = '{}', Year_Standing = '{}', School = '{}', Role = '{}' WHERE Student_ID = '{}'".format(studentFName, studentLName, major, email, phone, projectIntrest, gradDate, year, college, role, studentID)
        db_Connection.update_query(update_info_query)
        
        # Update Student Course Information
        update_course_query = "UPDATE STUDENT_CLASS SET CSEC_390 = '{}', CSEC_490 = '{}', CSEC_488 = '{}', IS_486 = '{}', IS_487 = '{}', ACC_374 = '{}' , ACC_376 = '{}', ACC_378 = '{}', ACC_636 = '{}', ACC_638 = '{}', ACC_639 = '{}', FIN_362 = '{}', SEV_621 = '{}', SEC_Dae = '{}', WiCyS = '{}' WHERE Student_ID = '{}'".format(CSEC390, CSEC490, CSEC488, IS486, IS487, ACC374, ACC376, ACC378, ACC636, ACC638, ACC639, FIN362, SEV621, SEC_DAEMONS, WICYS, studentID)
        db_Connection.update_query(update_course_query)      

        payload = {'message': 'Student Updated Successfully!'}
        return payload
    
