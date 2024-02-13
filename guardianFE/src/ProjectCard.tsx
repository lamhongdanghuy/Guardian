interface ProjectCardProps {
  name: string;
  status: string;
  projectLeader: string;
  type: string;
  onClick: Function;
}

function ProjectCard(props: ProjectCardProps) {
  const handleClick = () => {
    props.onClick("1234");
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
      <h2>{props.name}</h2>
      <text>{props.status}</text>
      <text>Project Leader: {props.projectLeader}</text>
      <text>{props.type}</text>
    </div>
  );
}

export default ProjectCard;
