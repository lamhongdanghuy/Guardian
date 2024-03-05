from datetime import datetime, timedelta
import pandas as pd


class Project:
    def get_Projects(self, Client_ID, db_Connection):
        if not Client_ID:
            query = """
                SELECT *
                FROM PROJECT
                WHERE Status = "Approved";
                """
        else:
            query = """
                SELECT *
                FROM PROJECT
                WHERE Client_ID = '{}';
                """.format(Client_ID)
        
        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Projects not found', 'projects': []}
        else:
            payload = {'message': 'Projects Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def get_proposals(self, db_Connection):
        query = """
            SELECT *
            FROM PROJECT
            WHERE Status = "In Review";
            """

        print(query)
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Proposals not found', 'projects': []}
        else:
            payload = {'message': 'Proposals Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def get_student_projects(self, Student_ID, db_Connection):
        query = """
            SELECT *
            FROM PROJECT_PARTICIPANT
            WHERE Student_ID = '{}';
            """.format(Student_ID)
        
        print(query)
        projectIDData = db_Connection.select_query(query)
        
        projectData = pd.DataFrame()

        for indx,row in projectIDData.iterrows():
            query = """
                SELECT *
                FROM PROJECT
                WHERE Proj_ID = '{}';
                """.format(row['Proj_ID'])
            projectData = pd.concat([projectData,db_Connection.select_query(query)])

        if projectData.empty:
            payload = {'message': 'Projects not found', 'projects': []}
        else:
            payload = {'message': 'Projects Successfully Retrieved!',
                       'projects': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def add_student(self, studentID, projectID, db_Connection):
        query = """
            INSERT INTO PROJECT_PARTICIPANT
            VALUES ('{}', '{}');
            """.format(projectID, studentID)
        db_Connection.send_query(query)
        return {'message': 'Student added to project'}
    
    def reject_Project(self, projectID, db_Connection):
        reject_query = "UPDATE PROJECT SET Status = 'Denied' WHERE Proj_ID = '{}'".format(projectID['projectID'])
        db_Connection.update_query(reject_query)
        return {"message": "Project rejected"}
    
    def done_Project(self, projectID, db_Connection):
        done_query = "UPDATE PROJECT SET Status = 'Completed' WHERE Proj_ID = '{}'".format(projectID['projectID'])
        db_Connection.update_query(done_query)
        return {"message": "Project completed"}
    
    def update_Project(self, data, db_Connection):
        project_id = data['projectID']['projectID']
        get_student_ID_query = "SELECT Student_ID FROM STUDENT WHERE Email = '{}'".format(data['projectLeaderEmail'])
        leader_ID = db_Connection.select_query(get_student_ID_query).at[0, 'Student_ID']
        
        update_query = "UPDATE PROJECT SET Status = '{}', Description = '{}', Due_Date = '{}', Stu_Lead_ID = '{}' WHERE Proj_ID = '{}'".format(data['status'], data['description'], data['enteredDate'], leader_ID, project_id)
        db_Connection.update_query(update_query)
        
        delete_exiting_assign_students = "DELETE FROM PROJECT_PARTICIPANT WHERE Proj_ID = '{}'".format(project_id)
        db_Connection.update_query(delete_exiting_assign_students)
        
        for student in data['assigned_students']:
            get_student_ID_query = "SELECT Student_ID FROM STUDENT WHERE Email = '{}'".format(student['Email'])
            student_ID = db_Connection.select_query(get_student_ID_query).at[0, 'Student_ID']
            assign_student_query = "INSERT INTO PROJECT_PARTICIPANT VALUES ('{}', '{}')".format(project_id, student_ID)
            db_Connection.update_query(assign_student_query)
        return {"message": "Project updated"}