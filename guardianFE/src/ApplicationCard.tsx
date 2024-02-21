interface ApplicationCardProps {
  studentID: string;
  name: string;
  year: string;
  major: string;
  gradDate: string;
  onClick: Function;
}

function ApplicationCard(props: ApplicationCardProps) {
  const handleClick = () => {
    props.onClick(props.studentID);
  };

  return (
    <div
      style={{
        flex: "40%",
        height: "15em",
        border: "1px solid white",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div className="cardTopApplication">
        <h2
          style={{ fontSize: "24px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.name}
        </h2>
        <h2
          style={{ fontSize: "24px", marginRight: "1vw", marginLeft: "auto" }}
        >
          {props.major}
        </h2>
      </div>
      <div className="cardBottom">
        <h2
          style={{ fontSize: "24px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.year}
        </h2>
        <h2
          style={{ fontSize: "24px", marginRight: "1vw", marginLeft: "auto" }}
        >
          Grad Date: {props.gradDate}
        </h2>
      </div>
    </div>
  );
}

export default ApplicationCard;
