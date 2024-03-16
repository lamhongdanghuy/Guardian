//Project Proposals Cards View in Dashboard
// Contributors: Albert Luna

import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import ProposalCard from "./ProposalCard";
import API_BASE_URL from "./fetchApiURL";

interface proposalProposalViewProp {
  onClick: Function;
}

interface Proposal {
  C_Name: string;
  Status: string;
  Stu_Lead_ID: string;
  Pro_Type: string;
  projectID: string;
  Proj_ID: string;
}

function ProposalsView(props: proposalProposalViewProp) {
  const { user } = useContext(LoginContext);
  const [proposalsList, setProposalsList] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProposals();
  }, []);

  const getProposals = async () => {
    const response = await fetch(`${API_BASE_URL}/get/project/proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        userID: user.role !== "Faculty" ? user.id : null,
      }),
    });
    const result = await response.json();
    console.log(result);
    setProposalsList(result.projects);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 style={{ fontSize: "10vh" }}>Proposals</h1>
          <div
            style={{
              margin: "0 5vw",
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
              overflowY: "scroll",
              maxHeight: "70vh",
              marginBottom: "5vh",
              gap: "5vh",
            }}
          >
            {proposalsList.map((proposal: Proposal) => (
              <ProposalCard
                name={proposal.C_Name}
                status={proposal.Status}
                ProposalLeader={proposal.Stu_Lead_ID}
                type={proposal.Pro_Type}
                onClick={props.onClick}
                ProposalID={proposal.Proj_ID}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProposalsView;
