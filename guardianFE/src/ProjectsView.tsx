import ProjectCard from "./ProjectCard";

interface projectViewProp {
  onClick: Function;
}

function ProjectsView(props: projectViewProp) {
  return (
    <div
      style={{
        marginTop: "12.5vh",
        maxHeight: "87.5vh",
        overflow: "hidden",
      }}
    >
      <h1 style={{ fontSize: "10vh" }}>Projects</h1>
      <div
        style={{
          margin: "0 5vw",
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          overflowY: "scroll",
          maxHeight: "70vh",
          marginBottom: "5vh",
          gap: "5vh",
        }}
      >
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
        ></ProjectCard>
      </div>
    </div>
  );
}

export default ProjectsView;
