//My Information Tab
//Contributor: Albert Luna, Hong Lam

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
  const [college, setCollege] = useState<string | null>("");
  const date = gradDateUnformatted ? new Date(gradDateUnformatted) : null;
  const gradDate = date
    ? `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${date.getUTCFullYear()}`
    : "Not Approved";

  const { user } = useContext(LoginContext);

  const [VCode, setVCode] = useState("");
  const [VCodeInput, setVCodeInput] = useState("");
  const [PassForm, setPassForm] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const resetpassword = async () => {
    const response = await fetch("http://localhost:5000/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    setVCode(result.VCode);
    setPassForm(true);
  };

  const changePassword = async () => {
    if (VCode == VCodeInput) {
      if (password !== repeatPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await fetch("http://localhost:5000/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      setPassForm(false);
      alert(result.message);
    } else {
      alert("Verification Code is incorrect");
    }
  };

  const getFacultyInfo = async () => {
    const response = await fetch("http://localhost:5000/faculty/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ facultyID: { facultyID: user.id } }),
    });
    const result = await response.json();
    setname(
      result.faculty_info[0].F_Name + " " + result.faculty_info[0].L_Name
    );
    setEmail(result.faculty_info[0].Email);
    setPhone(result.faculty_info[0].P_Number);
    setLoading(false);
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
      getStudentInfo();
    } else if (
      user.role.toUpperCase() === "ADMIN ASSISTANT" ||
      user.role.toUpperCase() === "CLINIC DIRECTOR" ||
      user.role.toUpperCase() === "BOARD DIRECTOR"
    ) {
      getFacultyInfo();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : !PassForm ? (
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
          <h1
            style={{
              fontSize: "32px",
              marginRight: "auto",
              marginLeft: "0vw",
              color: "#6e7c85",
            }}
          >
            {user.role}
          </h1>
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
          <button
            style={{
              fontSize: "24px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "5vh",
            }}
            onClick={resetpassword}
          >
            Change Password
          </button>
          {user.role != "Admin Assistant" && user.role != "Clinic Director" && (
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
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "35%",
            margin: "auto",
            border: "1px solid #6e7c85",
            gap: ".5em",
            padding: "2em",
            borderRadius: "1em",
            backdropFilter: "blur(15px)",
            marginTop: "20vh",
          }}
        >
          <h1>Change Password</h1>
          <label htmlFor="VCode">Verification Code:</label>
          <input
            type="text"
            id="VCode"
            name="VCode"
            onChange={(event) => setVCodeInput(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={(event) => setRepeatPassword(event.target.value)}
          />{" "}
          <br />
          <button onClick={changePassword}>Change Password</button>
        </div>
      )}
    </div>
  );
}

export default MyInformationView;
