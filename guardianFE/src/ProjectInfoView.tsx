//Contributors: Albert Luna and Hong Lam

//Albert Luna: Base Code + Styling 70%
//Hong Lam: Edit Functionality 30%
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import MemberCard from "./MemberCard";

//Member class
interface Member {
  Email: string;
  Full_Name: string;
  Student_ID: string;
}

//props/agruments
interface props {
  projectID: string;
}

function ProjectInfoView(projectID: props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string | null>("");
  const [students, setStudents] = useState<Member[]>([]);
  const [leaders, setLeaders] = useState<Member[]>([]);
  const [assigned_students, setAssignedStudents] = useState<Member[]>([]);
  const [type, setType] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");
  const [targetDate, setTargetDate] = useState<string | null>("");
  const [projectLeaderName, setProjectLeaderName] = useState<string | null>("");
  const [projectLeaderEmail, setProjectLeaderEmail] = useState<string | null>(
    ""
  );
  const [submitted, setSubmitted] = useState(false);
  const [act_student, setStudent] = useState<Member | undefined>();
  const [, setLeader] = useState<Member | undefined>();
  const { user } = useContext(LoginContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const date = targetDate ? new Date(targetDate) : null;
  const [, Students] = useState<Member[]>([]);
  const [, AssignedStudents] = useState<Member[]>([]);
  const dateForDisplay = date ? date.toISOString().split("T")[0] : "";

  const formattedDate = date
    ? `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${date.getUTCFullYear()}`
    : "Not Approved";

  // Add a function to handle the submit
  const handleEdit = async () => {
    let invalidFields = [];
    if (targetDate === "") {
      invalidFields.push("Please enter a due date");
    }
    const enteredDate = formattedDate ? new Date(formattedDate) : null;
    const formattedDateString = enteredDate
      ? enteredDate.toISOString().slice(0, 19).replace("T", " ")
      : null;
    // Send the updated info to the backend
    setSubmitting(true);
    await fetch("http://localhost:5000/project/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        projectID,
        status,
        description,
        enteredDate: formattedDateString,
        projectLeaderEmail,
        assigned_students,
      }),
    });
    setSubmitted(true);
    // Exit edit mode
    setSubmitting(false);
    setIsEditing(false);
  };

  const handleRemove = (studentToRemove: Member) => {
    setAssignedStudents(
      assigned_students.filter(
        (student) => student.Student_ID !== studentToRemove.Student_ID
      )
    );
  };

  // Add a function to handle the cancel
  const handleCancel = async () => {
    // Exit edit mode
    setIsEditing(false);
    setLoading(true);
    await getProjectInfo();
    setLoading(false);
  };

  //API Call to set project as done
  const handleDone = async () => {
    const confirmDone = window.confirm(
      "Are you sure you want to mark this project as done?"
    );
    if (confirmDone) {
      setSubmitting(true);
      await fetch("http://localhost:5000/project/done", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token ? user.token : "",
        },
        body: JSON.stringify({ projectID }),
      });
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  //API Call to reject project
  const handleReject = async () => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this project?"
    );
    if (confirmReject) {
      setSubmitting(true);
      await fetch("http://localhost:5000/project/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token ? user.token : "",
        },
        body: JSON.stringify({ projectID }),
      });
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  //Adds student to project on frontend
  const addStudent = async (stu: Member) => {
    setAssignedStudents([...assigned_students, stu]);
    setStudents(
      students.filter((student) => student.Student_ID !== stu.Student_ID)
    );
  };

  //API call to get project info
  const getProjectInfo = async () => {
    const response = await fetch("http://localhost:5000/project/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ projectID }),
    });
    const result = await response.json();
    console.log(result);

    setClientName(result.project_info[0].C_Name);
    setType(result.project_info[0].Pro_Type);
    setDescription(result.project_info[0].Description);
    setStatus(result.project_info[0].Status);
    setTargetDate(result.project_info[0].Due_Date);
    setProjectLeaderName(result.project_info[0].Leader_Name);
    setProjectLeaderEmail(result.project_info[0].Leader_Email);
    setAssignedStudents(result.project_students);
    setStudents(result.roster);
    setLeaders(result.av_leaders);
    setLoading(false);
    Students([...result.roster]);
    AssignedStudents([...result.project_students]);
  };

  //loads project info on component render
  useEffect(() => {
    console.log("feting info");
    getProjectInfo();
    console.log(projectID);
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
                  Client: {clientName ? clientName : "Default"}
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Type: {type ? type : "Default"}
                </h1>
              </div>
              <label
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Status: {status ? status : "Not Approved"}
              </label>
              <div className="middleInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Description:
                </h1>
              </div>
              <input
                type="text"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                style={{ textAlign: "left", paddingBottom: "5vh" }}
              />
              <label
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Target Date:
                <input
                  value={dateForDisplay}
                  type="date"
                  onChange={(e) => setTargetDate(e.target.value)}
                  style={{
                    fontSize: "32px",
                    marginLeft: "1vw",
                  }}
                />
              </label>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Project Leader:
                <select
                  id="leaders"
                  name="leaders"
                  onChange={(event) => {
                    if (event.target.value !== "undefined") {
                      setLeader({
                        Full_Name: event.target.value.split(",")[0],
                        Email: event.target.value.split(",")[1],
                        Student_ID: event.target.value.split(",")[2],
                      });
                      setProjectLeaderEmail(event.target.value.split(",")[1]);
                    } else {
                      setLeader(undefined);
                      setProjectLeaderEmail("");
                    }
                  }}
                  required
                  style={{
                    height: "32px",
                    borderRadius: "5px",
                    fontSize: "20px",
                  }}
                >
                  <option value="undefined">
                    {projectLeaderName ? projectLeaderName : "Not Assigned"} (
                    {projectLeaderEmail ? projectLeaderEmail : "Not Assigned"})
                  </option>

                  {leaders.map((leader) => (
                    <option
                      value={[
                        leader.Full_Name,
                        leader.Email,
                        leader.Student_ID,
                      ]}
                      key={leader.Full_Name + leader.Student_ID}
                    >
                      {leader.Full_Name} ({leader.Email})
                    </option>
                  ))}
                </select>
              </h1>
              <div
                style={{
                  marginRight: "auto",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1em",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "0vw",
                    marginRight: "auto",
                  }}
                >
                  Team:
                </h1>
                {(user.role === "Clinic Director" ||
                  user.role === "Admin Assistant") && (
                  <div style={{ margin: "1em" }}>
                    <select
                      id="leader"
                      name="leader"
                      onChange={(event) => {
                        if (event.target.value !== "undefined") {
                          setStudent({
                            Full_Name: event.target.value.split(",")[0],
                            Email: event.target.value.split(",")[1],
                            Student_ID: event.target.value.split(",")[2],
                          });
                        } else {
                          setStudent(undefined);
                        }
                      }}
                      required
                      style={{
                        height: "32px",
                        borderRadius: "5px",
                        fontSize: "20px",
                      }}
                    >
                      <option value="undefined">Add A Student</option>

                      {students.map((student) => (
                        <option
                          value={[
                            student.Full_Name,
                            student.Email,
                            student.Student_ID,
                          ]}
                          key={student.Full_Name + student.Student_ID}
                        >
                          {student.Full_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {act_student && (
                  <button
                    onClick={() => act_student && addStudent(act_student)}
                  >
                    Add Student
                  </button>
                )}
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {assigned_students.map((student) => (
                  <>
                    <MemberCard
                      name={student.Full_Name}
                      role="Student"
                      email={student.Email}
                    />
                    <button onClick={() => handleRemove(student)}>
                      Remove
                    </button>
                  </>
                ))}
              </div>
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
                  Client: {clientName ? clientName : "Default"}
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Type: {type ? type : "Default"}
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
                Status: {status ? status : "Not Approved"}
              </h1>
              <div className="middleInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
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
                Target Date: {formattedDate ? formattedDate : "Not Approved"}
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Project Leader:{" "}
                {projectLeaderName ? projectLeaderName : "Not Assigned"} (
                {projectLeaderEmail ? projectLeaderEmail : "Not Assigned"})
              </h1>
              <div
                style={{
                  marginRight: "auto",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1em",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "0vw",
                    marginRight: "auto",
                  }}
                >
                  Team:
                </h1>
                {user.role === "Faculty" && (
                  <div style={{ margin: "1em" }}>
                    <select
                      id="leader"
                      name="leader"
                      onChange={(event) => {
                        if (event.target.value !== "undefined") {
                          setStudent({
                            Full_Name: event.target.value.split(",")[0],
                            Email: event.target.value.split(",")[1],
                            Student_ID: event.target.value.split(",")[2],
                          });
                        } else {
                          setStudent(undefined);
                        }
                      }}
                      required
                      style={{
                        height: "32px",
                        borderRadius: "5px",
                        fontSize: "20px",
                      }}
                    >
                      <option value="undefined">Add A Student</option>

                      {students.map((student) => (
                        <option
                          value={[
                            student.Full_Name,
                            student.Email,
                            student.Student_ID,
                          ]}
                          key={student.Full_Name + student.Student_ID}
                        >
                          {student.Full_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {act_student && (
                  <button
                    onClick={() => act_student && addStudent(act_student)}
                  >
                    Add Student
                  </button>
                )}
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {assigned_students.map((student) => (
                  <MemberCard
                    name={student.Full_Name}
                    role="Student"
                    email={student.Email}
                  />
                ))}
              </div>
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
              margin: "0 100px",
            }}
          >
            <button
              onClick={handleReject}
              style={{ backgroundColor: "#D30000" }}
            >
              Reject
            </button>
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#FCE205" }}
            >
              Edit
            </button>
            <button onClick={handleDone} style={{ backgroundColor: "#03C04A" }}>
              Done
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

export default ProjectInfoView;
