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
        payload = project_info.to_dict(orient='records')
        print(payload)
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