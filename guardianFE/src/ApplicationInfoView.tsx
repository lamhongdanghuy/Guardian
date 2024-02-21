import { useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

function ApplicationInfoView(studentID: string) {
  console.log(studentID);
  let studentName: string | null = null;
  let major: string | null = null;
  let description: string | null = null;
  let gradDate: string | null = null;
  let year: string | null = null;
  let college: string | null = null;

  const { user, setUser } = useContext(LoginContext);

  const getStudentInfo = async () => {
    const response = await fetch("http://localhost:5000/projectInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();

    studentName = result.studentName;
    major = result.major;
    description = result.description;
    gradDate = result.gradDate;
    year = result.year;
    college = result.college;
  };

  useEffect(() => {
    console.log("feting info");
    getStudentInfo();
    console.log(studentID);
  }, []);

  return (
    <div className="projectInfoView">
      <div className="topInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Student: {studentName ? studentName : "Default"}
        </h1>
        <h1
          style={{ fontSize: "32px", marginLeft: "auto", marginRight: "1vw" }}
        >
          Major: {major ? major : "None"}
        </h1>
      </div>
      <h1
        style={{
          fontSize: "32px",
          marginLeft: "0vw",
          marginRight: "auto",
          paddingBottom: "5vh",
        }}
      >
        Year: {year ? year : "No year"}
      </h1>
      <div className="middleInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Description:
        </h1>
      </div>
      <p style={{ textAlign: "left", paddingBottom: "5vh" }}>
        {description
          ? description
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      </p>
      <h1
        style={{
          fontSize: "32px",
          marginLeft: "0vw",
          marginRight: "auto",
          paddingBottom: "5vh",
        }}
      >
        Grad Date: {gradDate ? gradDate : "Not Approved"}
      </h1>
      <h1 style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}>
        College: {college ? college : "Not Assigned"}
      </h1>
    </div>
  );
}

export default ApplicationInfoView;
