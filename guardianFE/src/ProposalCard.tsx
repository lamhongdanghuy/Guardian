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
    console.log("clicked");
    console.log(props);
    console.log(props.ProposalID);
    props.onClick(props.ProposalID);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="cardTopProposal">
        <h2
          style={{
            fontSize: "26px",
            marginLeft: "2vw",
            marginRight: "auto",
            width: "60%",
            textAlign: "left",
            fontWeight: "700",
          }}
        >
          {props.name}
        </h2>
        <h2
          style={{
            fontSize: "20px",
            marginRight: "1vw",
            marginLeft: "auto",
            width: "40%",
            textAlign: "right",
            color: "#6e6e6e",
          }}
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
