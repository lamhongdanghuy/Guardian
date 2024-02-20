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
      <div className="cardTop">
        <h2
          style={{ fontSize: "30px", marginLeft: "1vw", marginRight: "auto" }}
        >
          {props.name}
        </h2>
        <h2
          style={{ fontSize: "30px", marginRight: "1vw", marginLeft: "auto" }}
        >
          {props.type}
        </h2>
      </div>
      <div className="cardTop">
        <h2 style={{ fontSize: "24px" }}>{props.status}</h2>
        <h2 style={{ fontSize: "24px" }}>
          Project Leader: {props.projectLeader}
        </h2>
      </div>
    </div>
  );
}

export default ProjectCard;
