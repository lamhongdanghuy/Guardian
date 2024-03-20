class Clients:

    def get_clients(self, db_Connection):
        # Gets the entire list of registered students
        query = """
            SELECT CLIENT.*, COMPANY.*
            FROM CLIENT
            INNER JOIN COMPANY ON CLIENT.Client_ID = COMPANY.Client_ID
            WHERE CLIENT.Status = "Active";
        """
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Application not found', 'students': []}
        else:
            payload = {'message': 'Application Successfully Retrieved!',
                       'applications': projectData.to_dict(orient='records')}
        return payload
    
    def get_specific_clients(self, data, db_Connection):
        # Gets the entire list of registered students
        query = """
            SELECT CLIENT.*, COMPANY.*
            FROM CLIENT
            INNER JOIN COMPANY ON CLIENT.Client_ID = COMPANY.Client_ID
            WHERE CLIENT.Status = "Active"
            AND CLIENT.Client_ID = "{}"
            AND COMPANY.Company_ID = "{}";
        """.format(data['clientID'], data['companyID'])
        projectData = db_Connection.select_query(query)
        if projectData.empty:
            payload = {'message': 'Application not found', 'students': []}
        else:
            payload = {'message': 'Application Successfully Retrieved!',
                       'applications': projectData.to_dict(orient='records')}
        print(payload)
        return payload
    
    def inactivate(self, data, db_Connection):
        query = """
            UPDATE CLIENT
            SET Status = "Inactive"
            WHERE Client_ID = "{}";
            """.format(data['clientID'])
        db_Connection.update_query(query)
        
        query = """
            UPDATE COMPANY
            SET Status = "Inactive"
            WHERE Company_ID = "{}";
            """.format(data['companyID'])
        db_Connection.update_query(query)
        
        payload = {'message': 'Inactivated Student Successfully!'}
        return payload
    
    
    def edit(self, data, db_Connection):
        select_email_query = """
            SELECT Email
            FROM CLIENT
            WHERE Client_ID = "{}";
        """.format(data['info']['clientID'])
        email = db_Connection.select_query(select_email_query)
        
        update_login_query = """
            UPDATE LOGIN_INFORMATION
            SET Email = "{}"
            WHERE Email = "{}";
        """.format(data['Email'], email['Email'][0])  
        db_Connection.update_query(update_login_query)
        
        # Update client information in CLIENT table
        update_client_query = """
            UPDATE CLIENT
            SET F_Name = "{}", L_Name = "{}", Email = "{}", P_Number = "{}"
            WHERE Client_ID = "{}";
        """.format(data['F_Name'], data['L_Name'], data['Email'], data['P_Number'], data['info']['clientID'])
        db_Connection.update_query(update_client_query)
        
        # Update company information in COMPANY table
        update_company_query = """
            UPDATE COMPANY
            SET C_Name = "{}", C_Type = "{}", C_URL = "{}", C_Revenue = "{}", C_IT = "{}", C_Sen_Data = "{}", C_SRA = "{}"
            WHERE Company_ID = "{}";
        """.format(data['C_Name'], data['C_Type'], data['C_URL'], data['C_Revenue'], data['C_IT'], data['C_Sen_Data'], data['C_SRA'], data['info']['companyID'])
        db_Connection.update_query(update_company_query)
        
        payload = {'message': 'Edit Client, Company, and LOGIN_INFORMATION Successfully!'}
        return payload