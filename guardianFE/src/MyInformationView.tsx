import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

function MyInformationView() {
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setname] = useState<string | null>("");
  const [major, setMajor] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [phone, setPhone] = useState<number | null>();
  const [projectIntrest, setProjectIntrest] = useState<string | null>("");
  const [coursesTaken, setCoursesTaken] = useState<string | null>("");
  const [gradDateUnformatted, setGradDateUnformatted] = useState<string | null>(
    ""
  );
  const [year, setYear] = useState<string | null>("");
  const [rtnData, setRtnData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [college, setCollege] = useState<string | null>("");
  const date = gradDateUnformatted ? new Date(gradDateUnformatted) : null;
  const gradDate = date
    ? `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${date.getUTCFullYear()}`
    : "Not Approved";
  const { user } = useContext(LoginContext);

  const changePassword = async () => {
    const response = await fetch("http://localhost:5000/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID: user.id }),
    });
    const responseData = await response.json();
    console.log(responseData);
    setRtnData(responseData.message);
    setShowResults(true);
  };

  const getClientInfo = async () => {
    const response = await fetch("http://localhost:5000/client/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ clientID: { clientID: user.id } }),
    });
    const result = await response.json();
    console.log(result);
    setname(result.client_info[0].F_Name + " " + result.client_info[0].L_Name);
    setEmail(result.client_info[0].Email);
    setPhone(result.client_info[0].P_Number);
    setLoading(false);
  };

  const getStudentInfo = async () => {
    console.log(user.id);
    const response = await fetch("http://localhost:5000/student/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID: { studentID: user.id } }),
    });
    const result = await response.json();
    setname(
      result.student_info[0].F_Name + " " + result.student_info[0].L_Name
    );
    setMajor(result.student_info[0].Major);
    setEmail(result.student_info[0].Email);
    setPhone(result.student_info[0].P_Number);
    setProjectIntrest(result.student_info[0].Proj_Interest);
    setGradDateUnformatted(result.student_info[0].Grad_Date);
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

  useEffect(() => {
    console.log(user.role);
    if (user.role.toUpperCase() === "CLIENT") {
      getClientInfo();
    } else if (
      user.role.toUpperCase() === "STUDENT" ||
      user.role.toUpperCase() === "STUDENT_LEADER"
    ) {
      console.log("getting student info");
      getStudentInfo();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : !showResults ? (
        <div className="projectInfoView">
          <div className="topInfo">
            <h1
              style={{
                fontSize: "48px",
                marginRight: "auto",
                marginLeft: "0vw",
              }}
            >
              Name: {name}
            </h1>
            {user.role.toUpperCase() === "STUDENT" && (
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "auto",
                  marginRight: "1vw",
                }}
              >
                Major: {major}
              </h1>
            )}
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
            {user.role.toUpperCase() === "STUDENT" && (
              <h1
                style={{
                  fontSize: "32px",
                  marginRight: "auto",
                  marginLeft: "0vw",
                }}
              >
                Year: {year}
              </h1>
            )}
            {user.role.toUpperCase() === "STUDENT" && (
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "auto",
                  marginRight: "1vw",
                }}
              >
                Project Intrest: {projectIntrest}
              </h1>
            )}
          </div>
          {/* <div className="middleInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Description:
        </h1>
      </div> */}
          {user.role.toUpperCase() === "STUDENT" && (
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
          )}
          {user.role.toUpperCase() === "STUDENT" && (
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
          )}
          {user.role.toUpperCase() === "STUDENT" && (
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "0vw",
                marginRight: "auto",
              }}
            >
              College: {college ? college : "Not Assigned"}
            </h1>
          )}
          <button onClick={changePassword}>Change Password</button>
          <h1
            style={{
              fontSize: "32px",
              marginLeft: "0vw",
              marginRight: "auto",
              paddingBottom: "5vh",
              color: "red",
            }}
          >
            Contact Admin Assitant or Clinic Director to change your
            information.
          </h1>
        </div>
      ) : (
        <div style={{ marginTop: "20vh" }}>
          <h2>{rtnData}</h2>
        </div>
      )}
    </div>
  );
}

export default MyInformationView;
