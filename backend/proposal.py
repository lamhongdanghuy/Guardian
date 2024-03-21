from connectDB import DatabaseConnection
from flask import jsonify

class proposal:
    def get_proposal_info(self, proposal_ID):
        # Gets the type of the project whose Id is given from the database
        proj_type_query = "SELECT Pro_Type FROM PROJECT WHERE Proj_ID = '{}'".format(proposal_ID)
        proj_type = DatabaseConnection().select_query(proj_type_query).at[0, 'Pro_Type']
        print(proj_type)
        
        leaders_query = "SELECT CONCAT(F_Name, ' ', L_Name) AS Full_Name, Email FROM STUDENT WHERE Role = 'Student_Leader' AND Status = 'Active'"
        # Gets the Name and email of the leader for the given project id
        leaders_data = DatabaseConnection().select_query(leaders_query)
        leaders = [
            {"Full_Name": row['Full_Name'], "Email": row['Email']} for index, row in leaders_data.iterrows()
        ]
        print(leaders)
        # Gets the Name and email of the student leader for the given project id
        students_query = "SELECT CONCAT(F_Name, ' ', L_Name) AS Full_Name, Email FROM STUDENT WHERE Role = 'Student' AND Status = 'Active' "
        students_data = DatabaseConnection().select_query(students_query)
        students = [
            {"Full_Name": row['Full_Name'], "Email": row['Email']} for index, row in students_data.iterrows()
        ]
        # Gets the company Name, project description, project status, project type, and project Due date for the given projectID
        proposal_query = "SELECT c.C_Name AS Company_Name, p.Pro_Type AS Project_Type, p.Description AS Project_Description, p.Status AS Project_Status, p.Due_Date AS Target_Date "\
                 "FROM PROJECT p "\
                 "JOIN COMPANY c ON p.Company_ID = c.Company_ID "\
                 "WHERE p.Proj_ID = '{}'".format(proposal_ID)

        proposal_data = DatabaseConnection().select_query(proposal_query)
        project_info = {
            "Company_Name": proposal_data.at[0, 'Company_Name'],
            "Project_Type": proposal_data.at[0, 'Project_Type'],
            "Project_Description": proposal_data.at[0, 'Project_Description'],
            "Project_Status": proposal_data.at[0, 'Project_Status'],
            "Target_Date": proposal_data.at[0, 'Target_Date']
        }
        # Returns Jsonified object containing collected information
        combined_data = {"project_info": project_info, "av_leaders": leaders ,"students": students}
        print(combined_data)
        return jsonify(combined_data)
    
    def approve_proposal(self, proposal_ID, leader_email, students):
        update_query = "UPDATE PROJECT SET Status = 'Approved' WHERE Proj_ID = '{}'".format(proposal_ID)
        # Gets the Id For the project leader
        get_leader_ID_query = "SELECT Student_ID FROM STUDENT WHERE Email = '{}'".format(leader_email)
        leader_ID = DatabaseConnection().select_query(get_leader_ID_query).at[0, 'Student_ID']
        # Changes the leader of a given project
        assign_leader_query = "UPDATE PROJECT SET Stu_Lead_ID = '{}' WHERE Proj_ID = '{}'".format(leader_ID, proposal_ID)
        DatabaseConnection().update_query(assign_leader_query)
        # For every student that is given to the function It adds them as a project participant
        for student in students:
            get_student_ID_query = "SELECT Student_ID FROM STUDENT WHERE Email = '{}'".format(student['Email'])
            student_ID = DatabaseConnection().select_query(get_student_ID_query).at[0, 'Student_ID']
            assign_student_query = "INSERT INTO PROJECT_PARTICIPANT VALUES ('{}', '{}')".format(proposal_ID, student_ID)
            DatabaseConnection().update_query(assign_student_query)
        # Approves the project in the Database
        DatabaseConnection().update_query(update_query)
        # Change status of Client and Company to active
        activate_client_query = "UPDATE CLIENT SET Status = 'Active' WHERE Client_ID = (SELECT Client_ID FROM PROJECT WHERE Proj_ID = '{}')".format(proposal_ID)
        DatabaseConnection().update_query(activate_client_query)
        activate_company_query = "UPDATE COMPANY SET Status = 'Active' WHERE Company_ID = (SELECT Company_ID FROM PROJECT WHERE Proj_ID = '{}')".format(proposal_ID)
        DatabaseConnection().update_query(activate_company_query)
        return jsonify({"message": "Proposal approved"})
    
    def reject_proposal(self, proposal_ID):
        # Rejects the project in the data base
        update_query = "UPDATE PROJECT SET Status = 'Denied' WHERE Proj_ID = '{}'".format(proposal_ID)
        DatabaseConnection().update_query(update_query)
        return jsonify({"message": "Proposal rejected"})