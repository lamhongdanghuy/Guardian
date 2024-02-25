import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import MemberCard from "./memberCard";

interface Member {
  name: string;
  role: string;
  email: string;
}

function ProjectInfoView(projectID: string) {
  console.log(projectID);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string | null>("");
  const [type, setType] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");
  const [targetDate, setTargetDate] = useState<string | null>("");
  const [projectLeader, setProjectLeader] = useState<string | null>("");

  const { user, setUser } = useContext(LoginContext);

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

    setClientName(result[0].C_Name);
    setType(result[0].Pro_Type);
    setDescription(result[0].Description);
    setStatus(result[0].Status);
    setTargetDate(result[0].Target_Date);
    setProjectLeader(result[0].Stu_Lead_ID);
    setLoading(false);
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
          <h1
            style={{
              fontSize: "32px",
              marginLeft: "0vw",
              marginRight: "auto",
              paddingBottom: ".5em",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Team:
          </h1>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectInfoView;
