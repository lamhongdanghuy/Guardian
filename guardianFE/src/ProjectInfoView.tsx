import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import MemberCard from "./MemberCard";

interface Member {
  Email: string;
  Full_Name: string;
  Student_ID: string;
}

interface props {
  projectID: string;
}

function ProjectInfoView(projectID: props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string | null>("");
  const [students, setStudents] = useState<Member[]>([]);
  const [assigned_students, setAssignedStudents] = useState<Member[]>([]);
  const [type, setType] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");
  const [targetDate, setTargetDate] = useState<string | null>("");
  const [projectLeader, setProjectLeader] = useState<string | null>("");
  const [act_student, setStudent] = useState<Member | undefined>();
  const { user } = useContext(LoginContext);

  const addStudent = async (stu: Member) => {
    await fetch("http://localhost:5000/addStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ projectID, student: stu }),
    });
    setAssignedStudents([...assigned_students, stu]);
    await getProjectInfo();
  };

  const getProjectInfo = async () => {
    const response = await fetch("http://localhost:5000/projectInfo", {
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
    setTargetDate(result.project_info[0].Target_Date);
    setProjectLeader(result.project_info[0].Stu_Lead_ID);
    setAssignedStudents(result.project_students);
    setStudents(result.roster);
    setLoading(false);

    console.log(assigned_students);
  };

  useEffect(() => {
    console.log("feting info");
    getProjectInfo();
    console.log(projectID);
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
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
            Target Date: {targetDate ? targetDate : "Not Approved"}
          </h1>
          <h1
            style={{
              fontSize: "32px",
              marginLeft: "0vw",
              marginRight: "auto",
              paddingBottom: "5vh",
            }}
          >
            Project Leader: {projectLeader ? projectLeader : "Not Assigned"}
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
            {(user.role === "Admin Assistant" ||
              user.role === "Clinic Director") && (
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
              <button onClick={() => act_student && addStudent(act_student)}>
                Add Student
              </button>
            )}
          </div>
          <div
            style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}
          >
            {assigned_students.map((student) => (
              <MemberCard
                name={student.Full_Name}
                role="Student"
                email={student.Email}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectInfoView;
