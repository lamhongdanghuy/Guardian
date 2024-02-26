import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./LoginContextProvider";
import MemberCard from "./memberCard";
function ProposalInfoView(ProposalID: string) {
  console.log(ProposalID);
  console.log("reading proposalID");
  interface Member {
    Full_Name: string;
    Email: string;
  }
  const [loading, setLoading] = useState<boolean>(true);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [av_leaders, setAvLeaders] = useState<Member[]>([]);
  const [act_student, setStudent] = useState<Member>();
  const [assigned_students, setAssignedStudents] = useState<Member[]>([]);
  const [students, setStudents] = useState<Member[]>([]);
  const [leaderEmail, setLeaderEmail] = useState<string>("");
  const [shouldApprove, setShouldApprove] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const approve = async () => {
    if (leaderEmail === null || leaderEmail === "") {
      alert("Please select a project leader before approving the proposal.");
    }

    const response = await fetch("http://localhost:5000/approveProposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ ProposalID, leaderEmail }),
    });
    const result = await response.json();
    return result;
  };

  const reject = async () => {
    const response = await fetch("http://localhost:5000/rejectProposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ ProposalID }),
    });
    const result = await response.json();
    return result;
  };

  const { user, setUser } = useContext(LoginContext);

  const addStudent = (stu: Member) => {
    setAssignedStudents([...assigned_students, stu]);
  };

  const getProposalInfo = async () => {
    const response = await fetch("http://localhost:5000/proposalInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ ProposalID }),
    });
    const result = await response.json();
    console.log(result);

    setCompanyName(result.project_info.Company_Name);
    setType(result.project_info.Project_Type);
    setDescription(result.project_info.Project_Description);
    setStatus(result.project_info.Project_Status);
    const targetDateObj = new Date(result.project_info.Target_Date);
    const formattedTargetDate = `${
      targetDateObj.getMonth() + 1
    }-${targetDateObj.getDate()}-${targetDateObj.getFullYear()}`;
    setTargetDate(formattedTargetDate);
    setAvLeaders(result.av_leaders);
    setStudents(result.students);
    setLoading(false);
  };

  useEffect(() => {
    getProposalInfo();
  }, []);

  useEffect(() => {
    if (shouldApprove) {
      approve();
      setShouldApprove(false);
    }
  }, [shouldApprove]);

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
              Company Name: {companyName}
            </h1>
            <h1
              style={{
                fontSize: "32px",
                marginLeft: "auto",
                marginRight: "1vw",
              }}
            >
              Type: {type}
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
            Status: {status}
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
            {description}
          </p>
          <h1
            style={{
              fontSize: "32px",
              marginLeft: "0vw",
              marginRight: "auto",
              paddingBottom: "5vh",
            }}
          >
            Target Date: {targetDate}
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
              Project Leader:
            </h1>
            <div style={{ margin: "1em" }}>
              <select
                id="leader"
                name="leader"
                onChange={(event) => {
                  setLeaderEmail(event.target.value);
                  setIsSubmitDisabled(false);
                }}
                required
                style={{
                  height: "32px",
                  borderRadius: "5px",
                  fontSize: "20px",
                }}
              >
                <option value="">Please Select A Leader</option>
                {av_leaders.map((leader) => (
                  <option value={leader.Email}>{leader.Full_Name}</option>
                ))}
              </select>
            </div>
          </div>
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
            <div style={{ margin: "1em" }}>
              <select
                id="leader"
                name="leader"
                onChange={(event) => {
                  setStudent({
                    Full_Name: event.target.value.split(",")[0],
                    Email: event.target.value.split(",")[1],
                  });
                }}
                required
                style={{
                  height: "32px",
                  borderRadius: "5px",
                  fontSize: "20px",
                }}
              >
                <option value="">Add A Student</option>

                {students.map((student) => (
                  <option
                    value={[student.Full_Name, student.Email]}
                    key={student.Full_Name}
                  >
                    {student.Full_Name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => act_student && addStudent(act_student)}>
              Add Student
            </button>
          </div>
          <div
            style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}
          >
            <MemberCard
              name="John Doe"
              role="Leader"
              email="johnDoe@depaul.edu"
            />
            <MemberCard
              name="John Doe"
              role="Leader"
              email="johnDoe@depaul.edu"
            />
            <MemberCard
              name="John Doe"
              role="Leader"
              email="johnDoe@depaul.edu"
            />
            <MemberCard
              name="John Doe"
              role="Leader"
              email="johnDoe@depaul.edu"
            />
            {assigned_students.map((student) => (
              <MemberCard
                name={student.Full_Name}
                role="Student"
                email={student.Email}
              />
            ))}
            ;
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "2em",
              justifyContent: "center",
              gap: "2em",
            }}
          >
            <button
              onClick={approve}
              style={{
                backgroundColor: "green",
                opacity: isSubmitDisabled ? 0.5 : 1,
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              }}
            >
              Approve
            </button>
            <button
              onClick={reject}
              style={{
                backgroundColor: "red",
                opacity: 1,
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProposalInfoView;
