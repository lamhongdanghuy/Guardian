import { useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import MemberCard from "./memberCard";

interface Member {
  name: string;
  role: string;
  email: string;
}

function ProjectInfoView(projectID: string) {
  console.log(projectID);
  let clientName: string | null = null;
  let type: string | null = null;
  let description: string | null = null;
  let status: string | null = null;
  let targetDate: string | null = null;
  let projectLeader: string | null = null;

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

    clientName = result.clientName;
    type = result.type;
    description = result.description;
    status = result.status;
    targetDate = result.targetDate;
    projectLeader = result.projectLeader;
  };

  useEffect(() => {
    console.log("feting info");
    getProjectInfo();
    console.log(projectID);
  }, []);

  return (
    <div className="projectInfoView">
      <div className="topInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Client: {clientName ? clientName : "Default"}
        </h1>
        <h1
          style={{ fontSize: "32px", marginLeft: "auto", marginRight: "1vw" }}
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
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
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
      <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
        <MemberCard name="John Doe" role="Leader" email="johnDoe@depaul.edu" />
        <MemberCard name="John Doe" role="Leader" email="johnDoe@depaul.edu" />
        <MemberCard name="John Doe" role="Leader" email="johnDoe@depaul.edu" />
        <MemberCard name="John Doe" role="Leader" email="johnDoe@depaul.edu" />
      </div>
    </div>
  );
}

export default ProjectInfoView;
