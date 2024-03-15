import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from './fetchApiURL';

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

  const getStudentInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/studentInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID }),
    });
    const result = await response.json();
    console.log("hi");
    console.log(result);
    setStudentName(
      result.student_info[0].F_Name + " " + result.student_info[0].L_Name
    );
    setMajor(result.student_info[0].Major);
    setEmail(result.student_info[0].Email);
    setPhone(result.student_info[0].P_Number);
    setProjectIntrest(result.student_info[0].Proj_Interest);
    setGradDate(result.student_info[0].Grad_Date);
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
    const response = await fetch(`${API_BASE_URL}/approveStudent`, {
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
    const response = await fetch(`${API_BASE_URL}/rejectStudent`, {
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

  useEffect(() => {
    console.log("feting info");
    getStudentInfo();
    console.log(studentID);
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
              Student: {studentName}
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Major: {major}
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
              Email: {email}
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Phone: {phone}
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
              Year: {year}
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Project Intrest: {projectIntrest}
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
          <h1
            style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}
          >
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
      )}
    </div>
  );
}

export default ApplicationInfoView;
