//STudent Application Information Display Component
//Contributor: Albert Luna, Hong Lam
// Albert Luna Base Code 80%
// Hong Lam 20% Approve + Reject

import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

interface props {
  studentID: string;
}

function ApplicationInfoView(studentID: props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [studentName, setStudentName] = useState<string | null>("");
  const [major, setMajor] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [phone, setPhone] = useState<number | null>();
  const [projectIntrest, setProjectIntrest] = useState<string | null>("");
  const [coursesTaken, setCoursesTaken] = useState<string | null>("");
  const [gradDate, setGradDate] = useState<string | null>("");
  const [year, setYear] = useState<string | null>("");
  const [college, setCollege] = useState<string | null>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { user } = useContext(LoginContext);
  //API call to get student info from database
  const getStudentInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/student/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    //console.log("hi");
    //console.log(result);
    setStudentName(
      result.student_info[0].F_Name + " " + result.student_info[0].L_Name
    );
    setMajor(result.student_info[0].Major);
    setEmail(result.student_info[0].Email);
    setPhone(result.student_info[0].P_Number);
    setProjectIntrest(result.student_info[0].Proj_Interest);
    const unformattedDate = result.student_info[0].Grad_Date;
    const date = new Date(unformattedDate);
    setGradDate(date.toISOString().split("T")[0]);
    setYear(result.student_info[0].Year_Standing);
    setCollege(result.student_info[0].School);
    setCoursesTaken(result.class_info[0]);
    setLoading(false);

    let takenList: String[] = [];
    if (result.class_info && result.class_info.length > 0) {
      for (let key in result.class_info[0]) {
        if (result.class_info[0][key] === 1) {
          takenList.push(key);
        }
      }
    }
    setCoursesTaken(takenList.join(", "));
  };
  const approve = async () => {
    const response = await fetch(`${API_BASE_URL}/student/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    setSubmitted(true);
    return result;
  };

  const reject = async () => {
    const response = await fetch(`${API_BASE_URL}/student/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    setSubmitted(true);
    return result;
  };
  //runs get student info when component renders
  useEffect(() => {
    //console.log("fetching info");
    getStudentInfo();
    //console.log(studentID);
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : submitted ? (
        <>
          <h1>Submitted</h1>
        </>
      ) : (
        <div className="projectInfoView">
          <div className="topInfo">
            <h1
              style={{
                fontSize: "48px",
                marginRight: "auto",
                marginLeft: "0vw",
              }}
            >
              Student: {""}
              <span style={{ color: "#33689c" }}>{studentName}</span>
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Major: {""}
              <span style={{ color: "#33689c" }}>{major}</span>
            </h1>
          </div>
          <div className="topInfo">
            <h1
              style={{
                fontSize: "32px",
                marginRight: "auto",
                marginLeft: "0vw",
              }}
            >
              Email: {""}
              <span style={{ color: "#33689c" }}>{email}</span>
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Phone: {""}
              <span style={{ color: "#33689c" }}>{phone}</span>
            </h1>
          </div>
          <div className="topInfo">
            <h1
              style={{
                fontSize: "32px",
                marginRight: "auto",
                marginLeft: "0vw",
              }}
            >
              Year: {""}
              <span style={{ color: "#33689c" }}>{year}</span>
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Project Intrest: {""}
              <span style={{ color: "#33689c" }}>{projectIntrest}</span>
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
            Grad Date: {""}
            <span style={{ color: "#33689c" }}>
              {gradDate ? gradDate : "Not Approved"}
            </span>
          </h1>
          <h1
            style={{
              fontSize: "32px",
              marginLeft: "0vw",
              marginRight: "auto",
              paddingBottom: "5vh",
            }}
          >
            Courses Taken: {""}
            <span style={{ color: "#33689c" }}>
              {coursesTaken ? coursesTaken : "No Courses Taken"}
            </span>
          </h1>
          <h1
            style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}
          >
            College: {""}
            <span style={{ color: "#33689c" }}>
              {college ? college : "Not Assigned"}
            </span>
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
      )}
    </div>
  );
}

export default ApplicationInfoView;
