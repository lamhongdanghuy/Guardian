import { useState, useContext, useEffect } from "react";
import HomeView from "./HomeView";
import ProjectsView from "./ProjectsView";
import ApplyView from "./ApplyView";
import ManageView from "./ManageView";
import ProjectProposalsView from "./ProjectProposalsView";
import StudentApplicationsView from "./StudentApplicationsView";
import ProjectInfoView from "./ProjectInfoView";
import { LoginContext } from "./LoginContextProvider";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  interface User {
    userId: string;
    email: string;
    role: string;
  }

  const returnToLandingPage = () => {
    setUser({ id: null, email: null, role: null, token: null });
    navigator("/");
  };

  const cardClicked = (projectID: string) => {
    setActiveContainer("Project Info View");
    setOpenProject(projectID);
    console.log("card clicked");
    console.log(projectID);
  };

  const navigator = useNavigate();

  const { user, setUser } = useContext(LoginContext);
  const [activeContainer, setActiveContainer] = useState("Home");
  const [openProject, setOpenProject] = useState("");
  useEffect(() => {
    if (user.userId === null) {
      navigator("/login");
    }
  }, [user]);

  return (
    <div className="dashboard">
      <div className="userBar">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>logged in as: {user.email} | </div>
          <div>role: {user.role}</div>
        </div>
        <div
          className="logoutButton"
          onClick={() => {
            setUser({ userId: null, email: null, role: null });
          }}
        >
          Log Out
        </div>
      </div>
      <div className="sidebar">
        {/* <img src="DePaul.svg" alt="Depaul Log" /> */}
        <div
          className="sidebarTitle"
          onClick={returnToLandingPage}
          style={{ cursor: "pointer" }}
        >
          Depaul Guardian
        </div>
        <div className="sidebarMenu">
          <div
            className="sidebarItem"
            onClick={() => setActiveContainer("Home")}
          >
            Home
          </div>
          <div
            className="sidebarItem"
            onClick={() => setActiveContainer("Projects")}
          >
            Projects
          </div>
          {user.role == "Client" && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Apply")}
            >
              Apply
            </div>
          )}
          {user.role == "faculty" && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Student Applications")}
            >
              Student Applications
            </div>
          )}
          {user.role == "faculty" && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Project Proposals")}
            >
              Project Proposal
            </div>
          )}
          {user.role == "faculty" && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Manage Tables")}
            >
              Manage Tables
            </div>
          )}
        </div>
        {/* <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/clients">Clients</Link>
        <Link to="/dashboard/students">Students</Link>
        <Link to="/dashboard/services">Services</Link> */}
      </div>
      <div
        style={{
          flex: "1",
          marginTop: "12.5vh",
          maxHeight: "87.5vh",
          overflow: "hidden",
        }}
      >
        {activeContainer === "Home" ? (
          <HomeView />
        ) : activeContainer === "Projects" ? (
          <ProjectsView onClick={cardClicked} />
        ) : activeContainer === "Apply" ? (
          <ApplyView />
        ) : activeContainer === "Manage Tables" ? (
          <ManageView />
        ) : activeContainer === "Project Proposals" ? (
          <ProjectProposalsView />
        ) : activeContainer === "Student Applications" ? (
          <StudentApplicationsView />
        ) : activeContainer === "Project Info View" ? (
          <ProjectInfoView projectID={openProject} />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
