interface ProjectCardProps {
  name: string;
  status: string;
  projectLeader: string;
  type: string;
  projectID: string;
  onClick: Function;
}

function ProjectCard(props: ProjectCardProps) {
  const handleClick = () => {
    props.onClick(props.projectID);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="cardTopProject">
        <h2
          style={{
            fontSize: "20px",
            marginLeft: "1vw",
            marginRight: "auto",
            width: "60%",
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
          }}
        >
          {props.type}
        </h2>
      </div>
      <div className="cardBottom">
        <h2 style={{ fontSize: "20px" }}>{props.status}</h2>
        <h2 style={{ fontSize: "20px" }}>Leader: {props.projectLeader}</h2>
      </div>
    </div>
  );
}

export default ProjectCard;
