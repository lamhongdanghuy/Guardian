import { useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

function ApplicationInfoView(studentID: string) {
  console.log(studentID);
  let studentName: string | null = null;
  let major: string | null = null;
  let email: string | null = null;
  let phone: string | null = null;
  let projectIntrest: string | null = null;
  let coursesTaken: Array<string> = [];
  let gradDate: string | null = null;
  let year: string | null = null;
  let college: string | null = null;

  const { user, setUser } = useContext(LoginContext);

  const getStudentInfo = async () => {
    const response = await fetch("http://localhost:5000/studentInfo", {
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
    email = result.email;
    phone = result.phone;
    projectIntrest = result.projectIntrest;
    coursesTaken = result.coursesTaken;
    gradDate = result.gradDate;
    year = result.year;
    college = result.college;
  };

  const approve = async () => {
    const response = await fetch("http://localhost:5000/approveStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    return result;
  };

  const reject = async () => {
    const response = await fetch("http://localhost:5000/rejectStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    return result;
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
      <div className="topInfo">
        <h1
          style={{ fontSize: "32px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Email: {email ? email : "____@____.com"}
        </h1>
        <h1
          style={{ fontSize: "32px", marginLeft: "auto", marginRight: "1vw" }}
        >
          Phone: {phone ? phone : "000-000-0000"}
        </h1>
      </div>
      <div className="topInfo">
        <h1
          style={{ fontSize: "32px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Year: {year ? year : "XXXX"}
        </h1>
        <h1
          style={{ fontSize: "32px", marginLeft: "auto", marginRight: "1vw" }}
        >
          Project Intrest: {projectIntrest ? projectIntrest : "No Intrest"}
        </h1>
      </div>
      {/* <div className="middleInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Description:
        </h1>
      </div> */}
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
      <h1
        style={{
          fontSize: "32px",
          marginLeft: "0vw",
          marginRight: "auto",
          paddingBottom: "5vh",
        }}
      >
        Courses Taken: {coursesTaken ? coursesTaken : "No Courses Taken"}
      </h1>
      <h1 style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}>
        College: {college ? college : "Not Assigned"}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2em",
          justifyContent: "center",
          gap: "2em",
        }}
      >
        <button onClick={approve} style={{ backgroundColor: "green" }}>
          Approve
        </button>
        <button onClick={reject} style={{ backgroundColor: "red" }}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default ApplicationInfoView;
