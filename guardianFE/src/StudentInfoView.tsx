import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

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

  const handleCancel = () => {
    setIsEditing(false);
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
    // setSubmitting(true);
    await fetch("http://localhost:5000/student/updateInfo", {
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
        phone,
        projectIntrest,
        gradDate: gradDateFormatted,
        year,
        college,
        coursesTaken: selectedCourses,
      }),
    });
    // setSubmitted(true);
    // // Exit edit mode
    // setSubmitting(false);
    // setIsEditing(false);
  };

  const getStudentInfo = async () => {
    const response = await fetch("http://localhost:5000/student/info", {
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
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  First Name:
                  <input
                    type="text"
                    value={studentFName ?? ""}
                    onChange={(e) => setStudentFName(e.target.value)}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Last Name:
                  <input
                    type="text"
                    value={studentLName ?? ""}
                    onChange={(e) => setStudentLName(e.target.value)}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Major:
                  <input
                    type="text"
                    value={major ?? ""}
                    onChange={(e) => setMajor(e.target.value)}
                  />
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
                  Email:
                  <input
                    type="email"
                    value={email ?? ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Phone:
                  <input
                    type="tel"
                    value={phone ?? ""}
                    onChange={(e) => setPhone(parseInt(e.target.value))}
                    pattern="[0-9]{10}"
                  />
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
                  Year:
                  <select
                    value={year ?? ""}
                    onChange={(e) => setYear(e.target.value)}
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
                  }}
                >
                  Project Intrest:{" "}
                  <select
                    value={projectIntrest ?? ""}
                    onChange={(e) => setProjectIntrest(e.target.value)}
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
                }}
              >
                Grad Date:
                <input
                  type="date"
                  value={gradDateFormatted ?? ""}
                  onChange={(e) => setGradDateUnformatted(e.target.value)}
                />
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
                <select onChange={handleSelectChange}>
                  <option>Select a course</option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <ul>
                  {selectedCourses.map((course) => (
                    <li key={course}>
                      {course}
                      <button onClick={() => handleRemoveClick(course)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                }}
              >
                College:
                <select
                  value={college ?? ""}
                  onChange={(e) => setCollege(e.target.value)}
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
                  }}
                >
                  First Name: {studentFName}
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Last Name: {studentLName}
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
                Courses Taken:{" "}
                {coursesTaken ? coursesTaken : "No Courses Taken"}
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                }}
              >
                College: {college ? college : "Not Assigned"}
              </h1>
            </>
          )}
        </div>
      )}
      {!loading &&
        ((!isEditing && user.role === "Clinic Director") ||
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
              In Activte Student
            </button>
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#FCE205" }}
            >
              Edit
            </button>
          </div>
        )}
      {isEditing && (
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
