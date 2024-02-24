import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./LoginContextProvider";

function ProposalInfoView(ProposalID: string) {
  interface Member {
    Full_Name: string;
    Email: string;
  }

  let member1: Member = {
    Full_Name: "John Doe",
    Email: "john.doe@example.com",
  };

  let member2: Member = {
    Full_Name: "Jane Doe",
    Email: "jane.doe@example.com",
  };

  let sample_leaders: Member[] = [member1, member2];

  console.log(ProposalID);
  let companyName: string | null = null;
  let type: string | null = null;
  let description: string | null = null;
  let status: string | null = null;
  let targetDate: string | null = null;
  let av_leaders: Member[] = [];

  const [leaderEmail, setLeaderEmail] = useState("");
  const approve = async () => {
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

    companyName = result.Company_Name;
    type = result.Project_Type;
    description = result.Project_Description;
    status = result.Project_Status;
    targetDate = result.Target_Date;
    av_leaders = result.av_leaders;
  };

  useEffect(() => {
    console.log("feting info");
    getProposalInfo();
    console.log(ProposalID);
  }, []);

  return (
    <div className="projectInfoView">
      <div className="topInfo">
        <h1
          style={{ fontSize: "48px", marginRight: "auto", marginLeft: "0vw" }}
        >
          Company: {companyName ? companyName : "Default"}
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
        <div>
          <select
            id="leader"
            name="leader"
            onChange={(event) => setLeaderEmail(event.target.value)}
            required
            style={{ height: "32px", borderRadius: "5px", fontSize: "20px" }}
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
          display: "flex",
          flexDirection: "row",
          marginTop: "2em",
          justifyContent: "center",
          gap: "2em",
        }}
      >
        <button onClick={approve} style={{ backgroundColor: "green" }}>
          Approve
        </button>
        <button onClick={reject} style={{ backgroundColor: "red" }}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default ProposalInfoView;
