interface ProposalCardProps {
  name: string;
  status: string;
  ProposalLeader: string;
  type: string;
  onClick: Function;
  ProposalID: string;
}

function ProposalCard(props: ProposalCardProps) {
  const handleClick = () => {
    props.onClick(props.ProposalID);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="cardTopProposal">
        <h2
          style={{ fontSize: "24px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.name}
        </h2>
        <h2
          style={{ fontSize: "24px", marginRight: "1vw", marginLeft: "auto" }}
        >
          {props.type}
        </h2>
      </div>
      <div className="cardBottom">
        {/* <h2 style={{ fontSize: "24px" }}>{props.status}</h2> */}
      </div>
    </div>
  );
}

export default ProposalCard;
