import pandas as pd;

class infoGetter:
    def getprojectinfo(self,id,db_connection):
        queryP = """
                SELECT 
                    P.Proj_ID,
                    P.C_Name,
                    P.Company_ID,
                    P.Client_ID,
                    Concat(S.F_Name, ' ', S.L_Name) AS Leader_Name,
                    S.Email AS Leader_Email,
                    P.Pro_Type,
                    P.Due_Date,
                    P.Date_submit,
                    P.Description,
                    P.Status
                FROM 
                    PROJECT AS P
                INNER JOIN 
                    STUDENT AS S ON P.Stu_Lead_ID = S.Student_ID
                WHERE 
                    P.Proj_ID = '{}';
                """.format(id)
        print(queryP)
        # # WHERE Email = '{}';
        #         # """.format(identifier)
        project_info = db_connection.select_query(queryP)
        print(project_info)
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
        
        proj_type_query = "SELECT Pro_Type FROM PROJECT WHERE Proj_ID = '{}'".format(id)
        proj_type = db_connection.select_query(proj_type_query).at[0, 'Pro_Type']
        print(proj_type)
        
        leaders_query = "SELECT CONCAT(F_Name, ' ', L_Name) AS Full_Name, Email, Student_ID FROM STUDENT WHERE Proj_Interest = '{}' AND Role = 'Student_Leader'".format(proj_type)

        leaders_data = db_connection.select_query(leaders_query)
        

        # payload = project_info.to_dict(orient='records')
        payload = { "project_info": project_info.to_dict(orient='records'), "project_students": project_studentInfo.to_dict(orient='records') , "roster": roster.to_dict(orient='records'), "av_leaders": leaders_data.to_dict(orient='records')}
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
    
    def getclientinfo(self,id,db_connection):
        id = id['clientID']
        queryC = """
                SELECT *
                FROM CLIENT
                WHERE Client_ID = '{}';
                """.format(id)
        Client_info = db_connection.select_query(queryC).to_dict(orient='records')
        payload = {
            "client_info": Client_info
        }
        return payload
    
    def getFacultyInfo(self,id,db_connection):
        id = id['facultyID']
        queryF = """
                SELECT *
                FROM FACULTY
                WHERE Faculty_ID = '{}';
                """.format(id)
        Faculty_info = db_connection.select_query(queryF).to_dict(orient='records')
        payload = {
            "faculty_info": Faculty_info
        }
        return payload
    
    def add_student(self, studentID, projectID, db_Connection):
        print (studentID)
        print (projectID)
        vals = [projectID, studentID]
        db_Connection.send_insert(vals, "PROJECT_PARTICIPANT")
        return {'message': 'Student added to project'}
