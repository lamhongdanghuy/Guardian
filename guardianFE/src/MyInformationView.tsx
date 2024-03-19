//My Information Tab
//Contributor: Albert Luna, Hong Lam

import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

function MyInformationView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [fName, setFName] = useState<string | null>("");
  const [lName, setLName] = useState<string | null>("");
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

  const handleCancel = async () => {
    setIsEditing(false);
    // Fetch the my information again to revert changes
    setLoading(true);
    if (user.role.toUpperCase() === "CLIENT") {
      await getClientInfo();
    } else if (
      user.role.toUpperCase() === "STUDENT" ||
      user.role.toUpperCase() === "STUDENT_LEADER"
    ) {
      await getStudentInfo();
    } else if (
      user.role.toUpperCase() === "ADMIN ASSISTANT" ||
      user.role.toUpperCase() === "CLINIC DIRECTOR" ||
      user.role.toUpperCase() === "BOARD OF DIRECTOR"
    ) {
      await getFacultyInfo();
    }
    setLoading(false);
  };
  const handleEdit = async () => {
    // Send the updated info to the backend
    setSubmitting(true);
    await fetch(`${API_BASE_URL}/faculty/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        facultyID: user.id,
        F_Name: fName,
        L_Name: lName,
        Email: email,
        OldEmail: user.email,
        P_Number: phone,
      }),
    });
    setSubmitted(true);
    // Exit edit mode
    setSubmitting(false);
    setIsEditing(false);
  };
  const resetpassword = async () => {
    const response = await fetch(`${API_BASE_URL}/forgotpassword`, {
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
      const response = await fetch(`${API_BASE_URL}/changepassword`, {
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
    const response = await fetch(`${API_BASE_URL}/faculty/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ facultyID: { facultyID: user.id } }),
    });
    const result = await response.json();
    setFName(result.faculty_info[0].F_Name);
    setLName(result.faculty_info[0].L_Name);
    setEmail(result.faculty_info[0].Email);
    setPhone(result.faculty_info[0].P_Number);
    setLoading(false);
  };

  const getClientInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/client/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ clientID: { clientID: user.id } }),
    });
    const result = await response.json();
    setFName(result.client_info[0].F_Name);
    setLName(result.client_info[0].L_Name);
    setEmail(result.client_info[0].Email);
    setPhone(result.client_info[0].P_Number);
    setLoading(false);
  };

  const getStudentInfo = async () => {
    console.log(user.id);
    const response = await fetch(`${API_BASE_URL}//student/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ studentID: { studentID: user.id } }),
    });
    const result = await response.json();
    setFName(result.student_info[0].F_Name);
    setLName(result.student_info[0].L_Name);
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
      user.role.toUpperCase() === "BOARD OF DIRECTOR"
    ) {
      getFacultyInfo();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : submitting ? (
        <h1>Submitting...</h1>
      ) : submitted ? (
        <h1>Submitted</h1>
      ) : !PassForm ? (
        <div className="projectInfoView">
          {isEditing ? (
            <>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  First Name:{" "}
                  <input
                    type="text"
                    value={fName ?? ""}
                    onChange={(e) => setFName(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                      width: "40%",
                    }}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Last Name:{" "}
                  <input
                    type="text"
                    value={lName ?? ""}
                    onChange={(e) => setLName(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                      width: "40%",
                    }}
                  />
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
                  Email:{" "}
                  <input
                    type="email"
                    value={email ?? ""}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Phone:{" "}
                  <input
                    type="tel"
                    value={phone ?? ""}
                    onChange={(e) => setPhone(parseInt(e.target.value))}
                    pattern="[0-9]{10}"
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  />
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
                  Courses Taken:{" "}
                  {coursesTaken ? coursesTaken : "No Courses Taken"}
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
            </>
          ) : (
            <>
              {" "}
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  First Name: {fName}
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Last Name: {lName}
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
                  Courses Taken:{" "}
                  {coursesTaken ? coursesTaken : "No Courses Taken"}
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
            </>
          )}

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
          <button onClick={() => setPassForm(false)}>Back</button>{" "}
          <h1>Change Password</h1>
          <label htmlFor="VCode">Verification Code:</label>
          <input
            type="text"
            id="VCode"
            name="VCode"
            placeholder="Please Check Your Email"
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
      {!loading &&
        !submitted &&
        !submitting &&
        !isEditing &&
        (user.role.toUpperCase() === "ADMIN ASSISTANT" ||
          user.role.toUpperCase() === "CLINIC DIRECTOR" ||
          user.role.toUpperCase() === "BOARD OF DIRECTOR") && (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "5vh",
            }}
          >
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#FCE205" }}
            >
              Edit
            </button>
          </div>
        )}
      {isEditing && !submitted && !submitting && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth: "400px",
          }}
        >
          <button onClick={handleCancel} style={{ backgroundColor: "#FCE205" }}>
            Cancel
          </button>
          <button onClick={handleEdit} style={{ backgroundColor: "#03C04A" }}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default MyInformationView;
