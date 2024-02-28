#DO NOT DELETE A FUNCTION WITHOUT SEEING WHERE IT IS REFERENCED FIRST

#Adding Tables and Columns:
    #Table - Make a Class in DataBase reflecting same spelling and Capitalization in real Database
    #Column - Add a function with the same name and capitalization as in the database that returns a string with same name and capitalization
#To Change TABLE Names REFACTOR the class name within DataBase. Then Change the string in 'tableName()' to the same table name
#To Change COLUMN Names REFACTOR the function name within Table class and change string to return the same name
class DataBase:
    class CLIENT:
        def tableName():
            return "Client"
        def Client_ID():
            return "Client_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return "P_Number"
        def Status():
            return "Status"
    
    class COMPANY:
        def tableName():
            return "COMPANY"
        def Company_ID():
            return "Company_ID"
        def C_Name():
            return "C_Name"
        def C_Type():
            return "C_Type"
        def C_URL():
            return "C_URL"
        def C_Revenue():
            return "C_Revenue"
        def C_IT():
            return "C_IT"
        def C_Sen_Data():
            return "C_Sen_Data"
        def C_SRA():
            return "C_SRA"
        def Hear():
            return "Hear"
        def Comment():
            return "Comment"
        def Status():
            return "Status"
        
    class FACULTY:
        def tableName():
            return "FACULTY"
        def Faculty_ID():
            return "Faculty_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return "P_Number"
        def Role():
            return "Role"
        def Status():
            return "Status"
        
    class LOGIN_INFORMATION:
        def tableName():
            return "LOGIN_INFORMATION"
        def Email():
            return "Email"
        def Password():
            return "Password"
        def Account_Type():
            return "Account_Type"
        def Email_Verified():
            return "Email_Verified"
        
    class PROJECT:
        def tableName():
            return "PROJECT"
        def Client_ID():
            return "Client_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return ""
        def Status():
            return ""
        
    class PROJECT_PARTICIPANT:
        def tableName():
            return "PROJECT_PARTICIPANT"
        def Client_ID():
            return "Client_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return ""
        def Status():
            return ""
        
    class STUDENT:
        def tableName():
            return "STUDENT"
        def Client_ID():
            return "Client_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return ""
        def Status():
            return ""
        
    class STUDENT_CLASS:
        def tableName():
            return "STUDENT_CLASS"
        def Client_ID():
            return "Client_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return ""
        def Status():
            return ""
        
    
    
        