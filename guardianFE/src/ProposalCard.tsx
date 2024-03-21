//Card component for proposals on the proposals tab.
//Contributor: Albert Luna 100%

interface ProposalCardProps {
  name: string;
  status: string;
  ProposalLeader: string;
  type: string;
  onClick: Function;
  ProposalID: string;
  dueDate: string;
}

function ProposalCard(props: ProposalCardProps) {
  const unforattedDate = new Date(props.dueDate);
  const date = unforattedDate.toDateString();

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
            marginLeft: "1vw",
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
        <h2
          style={{
            fontSize: "20px",
            marginLeft: "auto",
            marginRight: "1em",
            color: "black",
          }}
        >
          Due: {date}
        </h2>
      </div>
    </div>
  );
}

export default ProposalCard;
