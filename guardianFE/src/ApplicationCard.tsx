//Card Component for Student Applications, Visible on Student Applications Tab
//Contributor: Albert Luna

interface ApplicationCardProps {
  studentID: string;
  name: string;
  year: string;
  major: string;
  gradDate: string;
  onClick: Function;
  InReview: boolean;
}

function ApplicationCard(props: ApplicationCardProps) {
  const handleClick = () => {
    props.onClick(props.studentID);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className="cardTopApplication"
        style={{ backgroundColor: props.InReview ? "#feffba" : "#ffb3ba" }}
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
        <h2
          style={{
            fontSize: "20px",
            marginRight: "1vw",
            marginLeft: "auto",
            color: "#6e6e6e",
          }}
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
        ></h2>
      </div>
    </div>
  );
}

export default ApplicationCard;
