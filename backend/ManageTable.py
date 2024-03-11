from DatabaseTables import DataBase
from connectDB import DatabaseConnection

class ManageTable:
    
    def getTable(tableName):
        #This checks if the passed in table name exists in DataBase
        try:
            ManageTable.checkTableName(tableName)
        except Exception as e:
            print(e)
            return
        
        table = getattr(DataBase, tableName)
        
        tableQuery = """
            SELECT *
            FROM {}
            """.format(table.tableName())
        print(tableQuery)

        db_Connection = DatabaseConnection()
        tableData = db_Connection.select_query(tableQuery)
        columns = tableData.columns.tolist()
        rows = tableData.values.tolist()
        payload = {'columns': columns, 
                   'rows': rows
                  }

        return payload

    #Checks if the class in DataBase class exists
    def checkTableName(tableName):
        try:
            getattr(DataBase, tableName)
        except Exception as e:
            raise Exception("The Table Name doesn't exist or is spelled/capitalized wrong")
        
