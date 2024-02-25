import ProjectCard from "./ProjectCard";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

interface projectViewProp {
  onClick: Function;
  setView: Function;
}

interface Project {
  name: string;
  status: string;
  projectLeader: string;
  type: string;
  projectID: string;
}

function ProjectsView(props: projectViewProp) {
  const { user, setUser } = useContext(LoginContext);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const response = await fetch("http://localhost:5000/getProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        userID: user.role !== "Faculty" ? user.id : null,
      }),
    });
    const result = await response.json();
    console.log(result);
    console.log("reading projects");
    console.log(result.projects);
    setProjectsList(result.projects);
  };

  return (
    <div>
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
          projectID="1234"
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          projectID="5678"
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          projectID="1234"
        ></ProjectCard>
        <ProjectCard
          name={"Project Name"}
          status={"Current Status"}
          projectLeader={"PERSON"}
          type={"GRA"}
          onClick={props.onClick}
          projectID="1234"
        ></ProjectCard>

        {projectsList.map((project: Project) => (
          <ProjectCard
            name={project.name}
            status={project.status}
            projectLeader={project.projectLeader}
            type={project.type}
            onClick={props.onClick}
            projectID={project.projectID}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsView;
