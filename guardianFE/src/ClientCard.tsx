//Card Component for Client Applications, Visible on Client Applications Tab
//Contributor: Hong Lam

interface ClientCardProps {
  name: string;
  company: string;
  phone: string;
  email: string;
  clientID: string;
  companyID: string;
  onClick: Function;
}

function ClientCard(props: ClientCardProps) {
  const handleClick = () => {
    props.onClick({ clientID: props.clientID, companyID: props.companyID });
};


  return (
    <div className="card" onClick={handleClick}>
      <div
        className="cardTopApplication"
      // style={{ backgroundColor: props.InReview ? "#feffba" : "#ffb3ba" }}
      >
        <h2
          style={{
            fontSize: "26px",
            marginLeft: "1vw",
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          {props.name}
        </h2>
        <h4
          style={{ fontSize: "20px",
          marginLeft: "1vw",
          marginRight: "auto",
          textAlign: "left",
          color: "green", }}
        >
          {props.company}
        </h4>
      </div>
      <div className="cardBottom">
        <h2
          style={{ fontSize: "24px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.phone}
        </h2>
        <h2
          style={{ fontSize: "24px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.email}
        </h2>
      </div>
    </div>
  );
}

export default ClientCard;
