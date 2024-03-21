#DO NOT DELETE A FUNCTION WITHOUT SEEING WHERE IT IS REFERENCED FIRST
#How to use:
    #from DataBaseTables import DataBase
#Example call:    
#DataBase.LOGIN_INFORMATION.LOGIN_INFORMATION_tablename()

#FUNCTION NAME FORMAT: "Tablename_Fieldname"
#Adding Tables and Columns:
    #Table - Make a Class in DataBase reflecting same spelling and Capitalization in real Database
    #Column - Add a function with the same name and capitalization as in the database that returns a string with same name and capitalization
#To Change TABLE Names REFACTOR/(Edit->Replace in Files) the class name within DataBase. Then Change the string in 'tableName()' to the same table name
#To Change COLUMN Names REFACTOR/(Edit->Replace in Files) the function name within Table class and change string to return the same name
class DataBase:
    class LOGIN_INFORMATION:
        def tableName():
            return "LOGIN_INFORMATION"
        def LOGIN_INFORMATION_Email():
            return "Email"
        def LOGIN_INFORMATION_Password():
            return "Password"
        def LOGIN_INFORMATION_Account_Type():
            return "Account_Type"
        def LOGIN_INFORMATION_Email_Verified():
            return "Email_Verified"
    
    class STUDENT:
        def tableName():
            return "STUDENT"
        def STUDENT_Student_ID():
            return "Student_ID"
        def STUDENT_F_Name():
            return "F_Name"
        def STUDENT_L_Name():
            return "L_Name"
        def STUDENT_Email():
            return "Email"
        def STUDENT_P_Number():
            return "P_Number"
        def STUDENT_School():
            return "School"
        def STUDENT_Major():
            return "Major"
        def STUDENT_Year_Standing():
            return "Year_Standing"
        def STUDENT_Grad_Date():
            return "Grad_Date"
        def STUDENT_Proj_Interest():
            return "Proj_Interest"
        def STUDENT_Heard():
            return "Heard"
        def STUDENT_First_hear():
            return "First_hear"
        def STUDENT_Gender():
            return "Gender"
        def STUDENT_Ethnicity():
            return "Ethnicity"
        def STUDENT_Role():
            return "Role"
        def STUDENT_Status():
            return "Status"
        

    class CLIENT:
        def tableName():
            return "CLIENT"
        def CLIENT_Client_ID():
            return "Client_ID"
        def CLIENT_F_Name():
            return "F_Name"
        def CLIENT_L_Name():
            return "L_Name"
        def CLIENT_Email():
            return "Email"
        def CLIENT_P_Number():
            return "P_Number"
        def CLIENT_Status():
            return "Status"
    
    class FACULTY:
        def tableName():
            return "FACULTY"
        def FACULTY_Faculty_ID():
            return "Faculty_ID"
        def FACULTY_F_Name():
            return "F_Name"
        def FACULTY_L_Name():
            return "L_Name"
        def FACULTY_Email():
            return "Email"
        def FACULTY_P_Number():
            return "P_Number"
        def FACULTY_Role():
            return "Role"
        def FACULTY_Status():
            return "Status"
        
    class COMPANY:
        def tableName():
            return "COMPANY"
        def COMPANY_Company_ID():
            return "Company_ID"
        def COMPANY_C_Name():
            return "C_Name"
        def COMPANY_C_Type():
            return "C_Type"
        def COMPANY_C_URL():
            return "C_URL"
        def COMPANY_C_Revenue():
            return "C_Revenue"
        def COMPANY_C_IT():
            return "C_IT"
        def COMPANY_C_Sen_Data():
            return "C_Sen_Data"
        def COMPANY_C_SRA():
            return "C_SRA"
        def COMPANY_Hear():
            return "Hear"
        def COMPANY_Comment():
            return "Comment"
        def COMPANY_Status():
            return "Status"
        
    
        
    class PROJECT:
        def tableName():
            return "PROJECT"
        def PROJECT_Proj_ID():
            return "Proj_ID"
        def PROJECT_C_Name():
            return "F_Name"
        def PROJECT_Company_ID():
            return "Company_ID"
        def PROJECT_Client_ID():
            return "Email"
        def PROJECT_Stu_Lead_ID():
            return "Stu_Lead_ID"
        def PROJECT_Pro_Type():
            return "Pro_Type"
        def PROJECT_Due_Date():
            return "Due_Date"
        def PROJECT_Date_submit():
            return "Date_submit"
        def PROJECT_Description():
            return "Description"
        def PROJECT_Status():
            return "Status"
        
    class PROJECT_PARTICIPANT:
        def tableName():
            return "PROJECT_PARTICIPANT"
        def PROJECT_PARTICIPANT_Proj_ID():
            return "Proj_ID"
        def PROJECT_PARTICIPANT_Student_ID():
            return "Student_ID"
        
        
    class STUDENT_CLASS:
        def tableName():
            return "STUDENT_CLASS"
        def STUDENT_CLASS_Student_ID():
            return "Student_ID"
        def STUDENT_CLASS_CSEC_390():
            return "CSEC_390"
        def STUDENT_CLASS_CSEC_490():
            return "CSEC_490"
        def STUDENT_CLASS_CSEC_488():
            return "CSEC_488"
        def STUDENT_CLASS_IS_486():
            return "IS_486"
        def STUDENT_CLASS_IS_487():
            return "IS_487"
        def STUDENT_CLASS_ACC_374():
            return "ACC_374"
        def STUDENT_CLASS_ACC_376():
            return "ACC_376"
        def STUDENT_CLASS_ACC_378():
            return "ACC_378"
        def STUDENT_CLASS_ACC_636():
            return "ACC_636"
        def STUDENT_CLASS_ACC_638():
            return "ACC_638"
        def STUDENT_CLASS_ACC_639():
            return "ACC_639"
        def STUDENT_CLASS_FIN_362():
            return "FIN_362"
        def STUDENT_CLASS_SEV_621():
            return "SEV_621"
        def STUDENT_CLASS_SEC_Dae():
            return "SEC_Dae"
        def STUDENT_CLASS_WiCyS():
            return "WiCyS"
        
      
        
    
    
        