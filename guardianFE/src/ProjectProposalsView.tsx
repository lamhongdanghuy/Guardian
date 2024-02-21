import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import ProposalCard from "./ProposalCard";

interface proposalProposalViewProp {
  onClick: Function;
}

interface Proposal {
  name: string;
  status: string;
  ProposalLeader: string;
  type: string;
  onClick: Function;
  ProposalID: string;
}

function ProposalsView(props: proposalProposalViewProp) {
  const { user, setUser } = useContext(LoginContext);
  const [proposalsList, setProposalsList] = useState<Proposal[]>([]);

  useEffect(() => {
    getProposals();
  }, []);

  const getProposals = async () => {
    const response = await fetch("http://localhost:5000/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "proposal/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ userID: user.id }),
    });
    const result = await response.json();
    setProposalsList(result);
  };

  return (
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
        <ProposalCard
          name={"Parsons"}
          status={"Current Status"}
          ProposalLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          ProposalID="1234"
        />
        <ProposalCard
          name={"Parsons"}
          status={"Current Status"}
          ProposalLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          ProposalID="1234"
        />
        <ProposalCard
          name={"Parsons"}
          status={"Current Status"}
          ProposalLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          ProposalID="1234"
        />
        <ProposalCard
          name={"Parsons"}
          status={"Current Status"}
          ProposalLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          ProposalID="1234"
        />

        {proposalsList.map((proposal: Proposal) => (
          <ProposalCard
            name={proposal.name}
            status={proposal.status}
            ProposalLeader={proposal.ProposalLeader}
            type={proposal.type}
            onClick={props.onClick}
            ProposalID={proposal.ProposalID}
          />
        ))}
      </div>
    </div>
  );
}

export default ProposalsView;
