// Member Card component for team members under a project
// Contributor: Albert Luna 100%

interface ProjectCardProps {
  name: string;
  status: string;
  projectLeader: string;
  type: string;
  projectID: string;
  onClick: Function;
  dueDate: string;
}

function ProjectCard(props: ProjectCardProps) {
  const unforattedDate = new Date(props.dueDate);
  const date = unforattedDate.toDateString();

  const handleClick = () => {
    props.onClick(props.projectID);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="cardTopProject">
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
            margin: "1em",
            color:
              props.status === "In Review"
                ? "orange"
                : props.status === "Approved"
                ? "green"
                : props.status === "Denied"
                ? "red"
                : "white",
          }}
        >
          ⬤ {props.status}
        </h2>
        <h2
          style={{
            fontSize: "20px",
            marginLeft: "auto",
            marginRight: "1em",
            color: "black",
            textWrap: "wrap",
          }}
        >
          Due: {date}
        </h2>
      </div>
    </div>
  );
}

export default ProjectCard;
