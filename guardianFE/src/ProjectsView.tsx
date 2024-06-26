//Projects Cards View in Dashboard
// Contributors: Albert Luna Code + Style 100%

import ProjectCard from "./ProjectCard";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

interface projectViewProp {
  onClick: Function;
}

interface Project {
  C_Name: string;
  Status: string;
  Stu_Lead_ID: string;
  Pro_Type: string;
  projectID: string;
  Proj_ID: string;
  Due_Date: string;
}

function ProjectsView(props: projectViewProp) {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(LoginContext);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  //component gets projects on render
  useEffect(() => {
    getProjects();
  }, []);

  //API Call to get projects from database
  const getProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/get/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        role: user.role,
        userID: [
          "Admin Assistant",
          "Clinic Director",
          "Board Of Director",
        ].includes(user.role)
          ? null
          : user.id,
      }),
    });
    const result = await response.json();
    console.log(result);
    console.log("reading projects");
    console.log(result.projects);
    setProjectsList(result.projects);
    setLoading(false);
  };
  
  //Component dynamically renders number of cards based on number of records from backend.
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {projectsList.length === 0 ? (
            <h1 style={{ fontSize: "10vh" }}>No available projects</h1>
          ) : (
            <>
              <h1 style={{ fontSize: "10vh" }}>Projects</h1><div
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
                {projectsList.map((project: Project) => (
                  <ProjectCard
                    name={project.C_Name}
                    status={project.Status}
                    projectLeader={project.Stu_Lead_ID}
                    type={project.Pro_Type}
                    onClick={props.onClick}
                    projectID={project.Proj_ID}
                    dueDate={project.Due_Date} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectsView;
