#Contributor: Hong Lam 100%

class Update():
    def faculty_update(self, db_Connection, data):
        facultyID = data['facultyID']
        facultyFName = data['F_Name']
        facultyLName = data['L_Name']
        email = data['Email']
        oldEmail = data['OldEmail']
        phone = data['P_Number']
        
        update_login_query = "UPDATE LOGIN_INFORMATION SET Email = '{}' WHERE Email = '{}'".format(email, oldEmail)
        db_Connection.update_query(update_login_query)
        
        update_query = "UPDATE FACULTY SET F_Name = '{}', L_Name = '{}', Email = '{}', P_Number = '{}' WHERE Faculty_ID = '{}'".format(facultyFName, facultyLName, email, phone, facultyID)
        db_Connection.update_query(update_query)
        
        payload = {'message': 'Faculty Updated Successfully!'}
        return payload