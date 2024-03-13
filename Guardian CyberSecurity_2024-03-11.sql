
DROP TABLE IF EXISTS `PROJECT_PARTICIPANT`;
DROP TABLE IF EXISTS `STUDENT_CLASS`;
DROP TABLE IF EXISTS `PROJECT`;
DROP TABLE IF EXISTS `COMPANY`;
DROP TABLE IF EXISTS `CLIENT`;
DROP TABLE IF EXISTS `FACULTY`;
DROP TABLE IF EXISTS `STUDENT`;
DROP TABLE IF EXISTS `LOGIN_INFORMATION`;



CREATE TABLE `LOGIN_INFORMATION` (
  `Email` char(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Account_Type` enum('Client','Faculty','Student') NOT NULL COMMENT 'Client, Faculty, Student',
  `Email_Verified` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Email`)
);



CREATE TABLE `STUDENT` (
  `Student_ID` char(255) NOT NULL,
  `F_Name` char(255) NOT NULL,
  `L_Name` char(255) NOT NULL,
  `Email` char(255) NOT NULL,
  `P_Number` bigint(11) unsigned NOT NULL,
  `School` varchar(255) NOT NULL,
  `Major` varchar(255) NOT NULL,
  `Year_Standing` enum('Freshman','Sophomore','Junior','Senior','Graduate') NOT NULL,
  `Grad_Date` date NOT NULL,
  `Proj_Interest` varchar(255) NOT NULL,
  `Heard` text DEFAULT NULL,
  `First_hear` text DEFAULT NULL,
  `Gender` enum('Male','Female','Other','N/A') NOT NULL,
  `Ethnicity` enum('American Indian or Alaska Native','Asian','Black or Afican American','Hispanic','Native Hawaiian or Other Pacific Islander','White','Other','N/A') NOT NULL,
  `Role` enum('Student','Student_Leader') NOT NULL COMMENT 'Student, Student_Leader',
  `Status` enum('Active','In Review','Inactive','Remove') NOT NULL DEFAULT 'In Review' COMMENT 'Active, In Review, Inactive, Remove',
  PRIMARY KEY (`Student_ID`,`Email`),
  UNIQUE KEY `UK_STUDENT_Student_ID` (`Student_ID`)
); 



CREATE TABLE `FACULTY` (
  `Faculty_ID` char(255) NOT NULL,
  `F_Name` char(255) NOT NULL,
  `L_Name` char(255) NOT NULL,
  `Email` char(255) NOT NULL,
  `P_Number` bigint(20) NOT NULL,
  `Role` enum('Admin Assistant','Clinic Director','Board Of Director') NOT NULL COMMENT 'Admin_Assistant, Clinic_Director, Board_Of_Director',
  `Status` enum('Active','In Review','Inactive','Remove') NOT NULL DEFAULT 'In Review' COMMENT 'Active, In Review, Inactive, Remove',
  PRIMARY KEY (`Faculty_ID`,`Email`)
);



CREATE TABLE `CLIENT` (
  `Client_ID` char(255) NOT NULL,
  `F_Name` char(255) NOT NULL,
  `L_Name` char(255) NOT NULL,
  `Email` char(255) NOT NULL,
  `P_Number` int(11) NOT NULL,
  `Status` enum('Active','In Review','Inactive','Remove') NOT NULL DEFAULT 'In Review' COMMENT 'Active, In Review, Inactive, Remove',
  PRIMARY KEY (`Client_ID`,`Email`),
  UNIQUE KEY `UK_CLIENT_Client_ID` (`Client_ID`),
  KEY `Email` (`Email`),
  CONSTRAINT `CLIENT_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `LOGIN_INFORMATION` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `COMPANY` (
  `Company_ID` char(255) NOT NULL,
  `Client_ID` char(255) NOT NULL,
  `C_Name` char(255) NOT NULL,
  `C_Type` enum('For Profit','Non-profit') NOT NULL,
  `C_URL` char(255) DEFAULT NULL,
  `C_Revenue` decimal(20,2) NOT NULL,
  `C_IT` int(11) DEFAULT NULL,
  `C_Sen_Data` text DEFAULT NULL,
  `C_SRA` enum('Never','1-2','3-5','More than 5') DEFAULT NULL,
  `Hear` text DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Status` enum('Active','In Review','Inactive','Remove') NOT NULL DEFAULT 'In Review' COMMENT 'Active, In Review, Inactive, Remove',
  PRIMARY KEY (`Company_ID`,`Client_ID`)
);





CREATE TABLE `PROJECT` (
  `Proj_ID` char(255) NOT NULL,
  `C_Name` char(255) NOT NULL,
  `Company_ID` char(255) NOT NULL,
  `Client_ID` char(255) NOT NULL,
  `Stu_Lead_ID` char(255) DEFAULT NULL,
  `Pro_Type` char(255) NOT NULL,
  `Due_Date` date NOT NULL,
  `Date_submit` date NOT NULL,
  `Description` text NOT NULL,
  `Status` enum('In Review','On Hold','Approved','Denied','Expired','Extended') NOT NULL DEFAULT 'In Review' COMMENT 'In Review, On Hold, Approved, Denied, Expired, Extended',
  PRIMARY KEY (`Proj_ID`),
  KEY `Company_ID` (`Company_ID`,`Client_ID`),
  KEY `PROJECT_ibfk_1` (`Stu_Lead_ID`),
  CONSTRAINT `PROJECT_ibfk_1` FOREIGN KEY (`Stu_Lead_ID`) REFERENCES `STUDENT` (`Student_ID`),
  CONSTRAINT `PROJECT_ibfk_2` FOREIGN KEY (`Company_ID`, `Client_ID`) REFERENCES `COMPANY` (`Company_ID`, `Client_ID`)
);





CREATE TABLE `PROJECT_PARTICIPANT` (
  `Proj_ID` char(255) NOT NULL,
  `Student_ID` char(255) NOT NULL,
  PRIMARY KEY (`Proj_ID`,`Student_ID`),
  KEY `Student_ID` (`Student_ID`),
  CONSTRAINT `PROJECT_PARTICIPANT_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `STUDENT` (`Student_ID`)
);




CREATE TABLE `STUDENT_CLASS` (
  `Student_ID` char(255) NOT NULL,
  `CSEC_390` tinyint(1) NOT NULL,
  `CSEC_490` tinyint(1) NOT NULL,
  `CSEC_488` tinyint(1) NOT NULL,
  `IS_486` tinyint(1) NOT NULL,
  `IS_487` tinyint(1) NOT NULL,
  `ACC_374` tinyint(1) NOT NULL,
  `ACC_376` tinyint(1) NOT NULL,
  `ACC_378` tinyint(1) NOT NULL,
  `ACC_636` tinyint(1) NOT NULL,
  `ACC_638` tinyint(1) NOT NULL,
  `ACC_639` tinyint(1) NOT NULL,
  `FIN_362` tinyint(1) NOT NULL,
  `SEV_621` tinyint(1) NOT NULL,
  `SEC_Dae` tinyint(1) NOT NULL,
  `WiCyS` tinyint(1) NOT NULL,
  PRIMARY KEY (`Student_ID`),
  CONSTRAINT `STUDENT_CLASS_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `STUDENT` (`Student_ID`)
);


