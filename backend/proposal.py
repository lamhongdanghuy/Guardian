from connectDB import DatabaseConnection
from flask import jsonify

class proposal:
    def get_proposal_info(self, proposal_ID):
        proj_type_query = "SELECT Pro_Type FROM PROJECT WHERE Proj_ID = '{}'".format(proposal_ID)
        proj_type = DatabaseConnection().select_query(proj_type_query).at[0, 'Pro_Type']
        print(proj_type)
        
        leaders_query = "SELECT CONCAT(F_Name, ' ', L_Name) AS Full_Name, Email FROM STUDENT WHERE Proj_Interest = '{}' AND Role = 'Student_Leader'".format(proj_type)

        leaders_data = DatabaseConnection().select_query(leaders_query)
        leaders = [
            {"Full_Name": row['Full_Name'], "Email": row['Email']} for index, row in leaders_data.iterrows()
        ]
        print(leaders)

        students_query = "SELECT CONCAT(F_Name, ' ', L_Name) AS Full_Name, Email FROM STUDENT WHERE Role != 'Student_Leader'"
        students_data = DatabaseConnection().select_query(students_query)
        students = [
            {"Full_Name": row['Full_Name'], "Email": row['Email']} for index, row in students_data.iterrows()
        ]
        
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
        
        combined_data = {"project_info": project_info, "av_leaders": leaders ,"students": students}
        print(combined_data)
        return jsonify(combined_data)
    
    def approve_proposal(self, proposal_ID, leader_email):
        update_query = "UPDATE PROJECT SET Status = 'Approved' WHERE Proj_ID = '{}'".format(proposal_ID)
        
        get_leader_ID_query = "SELECT Student_ID FROM STUDENT WHERE Email = '{}'".format(leader_email)
        leader_ID = DatabaseConnection().select_query(get_leader_ID_query).at[0, 'Student_ID']
        
        assign_leader_query = "UPDATE PROJECT SET Stu_Lead_ID = '{}' WHERE Proj_ID = '{}'".format(leader_ID, proposal_ID)
        
        DatabaseConnection().update_query(assign_leader_query)
        DatabaseConnection().update_query(update_query)
        return jsonify({"message": "Proposal approved"})
    
    def reject_proposal(self, proposal_ID):
        update_query = "UPDATE PROJECT SET Status = 'Denied' WHERE Proj_ID = '{}'".format(proposal_ID)
        DatabaseConnection().update_query(update_query)
        return jsonify({"message": "Proposal rejected"})