

class infoGetter:
    @staticmethod
    def getprojectinfo(id,db_connection):
        queryP="SELECT C_Name,Pro_Type,Description,Status,Due_Date,Stu_Lead_ID " \
               "From Project " \
               "Where Proj_ID = '{}';".format(id)

        project_info = db_connection.select_query(queryP)
        payload= {
            'clientName': project_info.at[0,'C_Name'],
            'type':  project_info.at[0,'Pro_Type'],
            'description':  project_info.at[0,'Description'],
            'status': project_info.at[0,'Status'],
            'targetDate': project_info.at[0,'Due_Date'],
            'projectLeader':  project_info.at[0,'Stu_Lead_ID']
        }

        return payload
    @staticmethod
    def getstudentinfo(id,db_connection):
        queryS = "SELECT F_Name,L_Name,Major,Email,P_Number,Proj_Interest,Grad_Date,Year_standing,school " \
                 "From Student " \
                 "Where Student_ID = '{}';".format(id)
        queryL = "Select * " \
                 "From Student_Class" \
                 "Where Student_ID = '{}'; ".format(id)
        Student_info = db_connection.select_query(queryS)
        CLass_Student_Info = db_connection.select_query(queryL)
        Clist = []
        for (columnName,data) in CLass_Student_Info.iteritems():
            if(columnName == "Student_ID"):
                continue;
            if(data > 0):
                Clist.append(columnName)
        payload= {
        'studentName': Student_info.at[0,"F_Name"] +" "+ Student_info.at[0,"L_Name"] ,
        'major': Student_info.at[0,"Major"],
        'email': Student_info.at[0,"Email"],
        'phone': Student_info.at[0,"P_Number"],
        'projectIntrest': Student_info.at[0,"Proj_Interest"],
        'coursesTaken':Clist,
        'gradDate': Student_info.at[0,"Grad_Date"],
        'year': Student_info.at[0,"Year_standing"],
        'college':Student_info.at[0,"school"],
        }
        return payload