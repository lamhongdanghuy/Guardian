// Student Information View when clicking on a student in Dashboard
// Contributors: Albert Luna, Hong Lam

import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

interface props {
  studentID: string;
}

const allCourses = [
  "CSEC_390",
  "CSEC_490",
  "CSEC_488",
  "IS_486",
  "IS_487",
  "ACC_374",
  "ACC_376",
  "ACC_378",
  "ACC_636",
  "ACC_638",
  "ACC_639",
  "FIN_362",
  "SEV_621",
  "Sec_Daemons",
  "WiCyS",
];

function StudentInfoView(studentID: props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [studentFName, setStudentFName] = useState<string | null>("");
  const [studentLName, setStudentLName] = useState<string | null>("");
  const [major, setMajor] = useState<string | null>("");
  const [oldEmail, setOldEmail] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [phone, setPhone] = useState<number | null>();
  const [projectIntrest, setProjectIntrest] = useState<string | null>("");
  const [coursesTaken, setCoursesTaken] = useState<string | null>("");

  // if (coursesTaken) {
  //   selectedCourses = coursesTaken.split(", ");
  // }
  const [gradDateUnformatted, setGradDateUnformatted] = useState<string | null>(
    ""
  );
  const [year, setYear] = useState<string | null>("");
  const [college, setCollege] = useState<string | null>("");
  const [availableCourses, setAvailableCourses] = useState(allCourses);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = event.target.value;
    setSelectedCourses([...selectedCourses, selectedCourse]);
    setAvailableCourses(
      availableCourses.filter((course) => course !== selectedCourse)
    );
  };

  const handleRemoveClick = (courseToRemove: string) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course !== courseToRemove)
    );
    setAvailableCourses([...availableCourses, courseToRemove]);
  };

  const date = gradDateUnformatted ? new Date(gradDateUnformatted) : null;
  const gradDateFormatted = date ? date.toISOString().split("T")[0] : "";

  const gradDate = date
    ? `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${date.getUTCFullYear()}`
    : "Not Approved";
  const { user } = useContext(LoginContext);

  const handleCancel = async () => {
    setIsEditing(false);
    // Fetch the student information again to revert changes
    setLoading(true);
    await getStudentInfo();
    setLoading(false);
  };

  const handleInActivate = async () => {
    const confirmInActivate = window.confirm(
      "Are you sure you want deactivate this student?"
    );
    if (confirmInActivate) {
      setSubmitting(true);
      await fetch("http://localhost:5000/student/inactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token ? user.token : "",
        },
        body: JSON.stringify({ studentID }),
      });
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    // Send the updated info to the backend
    setSubmitting(true);
    await fetch("http://localhost:5000/student/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        studentID,
        studentFName,
        studentLName,
        major,
        email,
        oldEmail,
        phone,
        projectIntrest,
        gradDate: gradDateFormatted,
        year,
        college,
        coursesTaken: selectedCourses,
      }),
    });
    setSubmitted(true);
    // Exit edit mode
    setSubmitting(false);
    setIsEditing(false);
  };

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

    setStudentFName(result.student_info[0].F_Name);
    setStudentLName(result.student_info[0].L_Name);
    setMajor(result.student_info[0].Major);
    setEmail(result.student_info[0].Email);
    setOldEmail(result.student_info[0].Email);
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
    console.log(takenList);
    setSelectedCourses(takenList as string[]);

    setAvailableCourses((availableCourses) =>
      availableCourses.filter((course) => !takenList.includes(course))
    );
    console.log(selectedCourses);
    console.log(availableCourses);
    setCoursesTaken(takenList.join(", "));
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : submitting ? (
        <h1>Submitting...</h1>
      ) : submitted ? (
        <h1>Submitted</h1>
      ) : (
        <div className="projectInfoView">
          {isEditing ? (
            <>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "40px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  First Name:{" "}
                  <input
                    type="text"
                    value={studentFName ?? ""}
                    onChange={(e) => setStudentFName(e.target.value)}
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
                    display: "flex",
                  }}
                >
                  Last Name: {""}
                  <input
                    type="text"
                    value={studentLName ?? ""}
                    onChange={(e) => setStudentLName(e.target.value)}
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
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0",
                  display: "flex",
                }}
              >
                Major:
                <input
                  type="text"
                  value={major ?? ""}
                  onChange={(e) => setMajor(e.target.value)}
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
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  Email:
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
                    display: "flex",
                  }}
                >
                  Phone:
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
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  Year:
                  <select
                    value={year ?? ""}
                    onChange={(e) => setYear(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  >
                    <option value="Freshmen">Freshmen</option>
                    <option value="Junior">Junior</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                    display: "flex",
                  }}
                >
                  Project Intrest:{" "}
                  <select
                    value={projectIntrest ?? ""}
                    onChange={(e) => setProjectIntrest(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  >
                    <option value="General Risk Assessment">
                      General Risk Assessment
                    </option>
                    <option value="Audit">Audit</option>
                    <option value="Policy Review">Policy Review</option>
                    <option value="Other">Other</option>
                  </select>
                </h1>
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                  display: "flex",
                }}
              >
                Grad Date:
                <input
                  type="date"
                  value={gradDateFormatted ?? ""}
                  onChange={(e) => setGradDateUnformatted(e.target.value)}
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
                  marginLeft: "0vw",
                  marginRight: "auto",
                  display: "flex",
                }}
              >
                Courses Taken:{" "}
                <select
                  onChange={handleSelectChange}
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #33689c",
                    fontSize: "24px",
                  }}
                >
                  <option>Select a course</option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </h1>
              <ul style={{ marginRight: "auto", fontSize: "28px" }}>
                {selectedCourses.map((course) => (
                  <li key={course}>
                    {course}{" "}
                    <button
                      onClick={() => handleRemoveClick(course)}
                      style={{ fontSize: "18px" }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  display: "flex",
                  marginBottom: "2vh",
                }}
              >
                College:
                <select
                  value={college ?? ""}
                  onChange={(e) => setCollege(e.target.value)}
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #33689c",
                    alignSelf: "center",
                    justifySelf: "center",
                    fontSize: "24px",
                  }}
                >
                  <option value="SoC">School of Computing</option>
                  <option value="DCOB">Driehaus College of Business</option>
                  <option value="Law">College of Law</option>
                </select>
              </h1>
            </>
          ) : (
            <>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    textAlign: "left",
                  }}
                >
                  Name:{" "}
                  <span style={{ color: "#33689c" }}>
                    {studentFName} {studentLName}
                  </span>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "0vw",
                  }}
                >
                  Major: <span style={{ color: "#33689c" }}>{major}</span>
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
                    textAlign: "right",
                    maxWidth: "50%",
                  }}
                >
                  Project Interest: {""}
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
                Courses Taken:{" "}
                <span style={{ color: "#33689c" }}>
                  {coursesTaken ? coursesTaken : "No Courses Taken"}
                </span>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                }}
              >
                College: {""}
                <span style={{ color: "#33689c" }}>
                  {college ? college : "Not Assigned"}
                </span>
              </h1>
              <br />
            </>
          )}
        </div>
      )}
      {!loading &&
        !submitted &&
        !submitting &&
        !isEditing &&
        (user.role === "Clinic Director" ||
          user.role === "Admin Assistant") && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 200px",
            }}
          >
            <button
              onClick={handleInActivate}
              style={{ backgroundColor: "#D30000" }}
            >
              Inactivate Student
            </button>
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
            margin: "0 200px",
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

export default StudentInfoView;
