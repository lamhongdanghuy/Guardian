#DO NOT DELETE A FUNCTION WITHOUT SEEING WHERE IT IS REFERENCED FIRST

#Adding Tables and Columns:
    #Table - Make a Class in DataBase reflecting same spelling and Capitalization in real Database
    #Column - Add a function with the same name and capitalization as in the database that returns a string with same name and capitalization
#To Change TABLE Names REFACTOR the class name within DataBase. Then Change the string in 'tableName()' to the same table name
#To Change COLUMN Names REFACTOR the function name within Table class and change string to return the same name
class DataBase:
    class CLIENT:
        def tableName():
            return "CLIENT"
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
        def Proj_ID():
            return "Proj_ID"
        def C_Name():
            return "F_Name"
        def Company_ID():
            return "Company_ID"
        def Client_ID():
            return "Email"
        def Stu_Lead_ID():
            return "Stu_Lead_ID"
        def Pro_Type():
            return "Pro_Type"
        def Due_Date():
            return "Due_Date"
        def Date_submit():
            return "Date_submit"
        def Description():
            return "Description"
        def Status():
            return "Status"
        
    class PROJECT_PARTICIPANT:
        def tableName():
            return "PROJECT_PARTICIPANT"
        def Proj_ID():
            return "Proj_ID"
        def Student_ID():
            return "Student_ID"
        
        
    class STUDENT:
        def tableName():
            return "STUDENT"
        def Student_ID():
            return "Student_ID"
        def F_Name():
            return "F_Name"
        def L_Name():
            return "L_Name"
        def Email():
            return "Email"
        def P_Number():
            return "P_Number"
        def School():
            return "School"
        def Major():
            return "Major"
        def Year_Standing():
            return "Year_Standing"
        def Grad_Date():
            return "Grad_Date"
        def Proj_Interest():
            return "Proj_Interest"
        def Heard():
            return "Heard"
        def First_hear():
            return "First_hear"
        def Gender():
            return "Gender"
        def Ethnicity():
            return "Ethnicity"
        def Role():
            return "Role"
        def Status():
            return "Status"
        
        
    class STUDENT_CLASS:
        def tableName():
            return "STUDENT_CLASS"
        def Student_ID():
            return "Student_ID"
        def CSEC_390():
            return "CSEC_390"
        def CSEC_490():
            return "CSEC_490"
        def CSEC_488():
            return "CSEC_488"
        def IS_486():
            return "IS_486"
        def IS_487():
            return "IS_487"
        def ACC_374():
            return "ACC_374"
        def ACC_376():
            return "ACC_376"
        def ACC_378():
            return "ACC_378"
        def ACC_636():
            return "ACC_636"
        def ACC_638():
            return "ACC_638"
        def ACC_639():
            return "ACC_639"
        def FIN_362():
            return "FIN_362"
        def SEV_621():
            return "SEV_621"
        def SEC_Dae():
            return "SEC_Dae"
        def WiCyS():
            return "WiCyS"
        
      
        
    
    
        