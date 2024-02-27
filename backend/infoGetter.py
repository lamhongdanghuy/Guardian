import pandas as pd;

class infoGetter:
    def getprojectinfo(self,id,db_connection):
        id = id['projectID']
        queryP= """
                SELECT *
                FROM PROJECT
                WHERE Proj_ID = '{}';
                """.format(id)
        
        # # WHERE Email = '{}';
        #         # """.format(identifier)
        project_info = db_connection.select_query(queryP)
        queryS = """
                SELECT Student_ID
                FROM PROJECT_PARTICIPANT
                WHERE Proj_ID = '{}';
                """.format(id)
        project_students = db_connection.select_query(queryS)
        project_studentInfo = pd.DataFrame()
        for indx,row in project_students.iterrows():
            query = """
                SELECT Email, Concat(F_Name, ' ', L_Name) AS Full_Name, Role
                FROM STUDENT
                WHERE Student_ID = '{}';
                """.format(row['Student_ID'])
            student_info = db_connection.select_query(query)
            project_studentInfo = pd.concat([project_studentInfo,student_info])

        queryRoster = """
                SELECT Email, Concat(F_Name, ' ', L_Name) AS Full_Name, Student_ID
                FROM STUDENT
                WHERE STUDENT_ID NOT IN (SELECT Student_ID FROM PROJECT_PARTICIPANT WHERE Proj_ID = '{}');""".format(id)
        roster = db_connection.select_query(queryRoster)

        # payload = project_info.to_dict(orient='records')
        payload = { "project_info": project_info.to_dict(orient='records'), "project_students": project_studentInfo.to_dict(orient='records') , "roster": roster.to_dict(orient='records')}
        return payload
    
    def getstudentinfo(self,id,db_connection):
        id = id['studentID']
        queryS = """
                SELECT *
                FROM STUDENT
                WHERE Student_ID = '{}';
                """.format(id)
        queryL = """
                SELECT *
                FROM STUDENT_CLASS
                WHERE Student_ID = '{}';
                """.format(id)
        Student_info = db_connection.select_query(queryS).to_dict(orient='records')
        CLass_Student_Info = db_connection.select_query(queryL).to_dict(orient='records')
        print(CLass_Student_Info)
        payload= {
            "student_info": Student_info,
            "class_info": CLass_Student_Info
        }
        return payload
    
    def add_student(self, studentID, projectID, db_Connection):
        print (studentID)
        print (projectID)
        vals = [projectID, studentID]
        db_Connection.send_insert(vals, "PROJECT_PARTICIPANT")
        return {'message': 'Student added to project'}