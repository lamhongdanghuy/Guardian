import { useState, useContext, useEffect } from "react";
import HomeView from "./HomeView";
import ProjectsView from "./ProjectsView";
import ApplyView from "./ApplyView";
import ManageView from "./ManageView";
import ProjectProposalsView from "./ProjectProposalsView";
import StudentApplicationsView from "./StudentApplicationsView";
import ProjectInfoView from "./ProjectInfoView";
import ApplicationInfoView from "./ApplicationInfoView";
import ProposalInfoView from "./ProposalInfoView";
import AddFaculty from "./AddFaculty";
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

  const projectCardClicked = (projectID: string) => {
    setPrevContainer(activeContainer);
    setActiveContainer("Project Info View");
    setOpenProject(projectID);
    console.log("card clicked");
    console.log(projectID);
  };

  const applicationCardClicked = (studentID: string) => {
    setPrevContainer(activeContainer);
    setActiveContainer("Application View");
    setOpenApplication(studentID);
  };

  const proposalCardClicked = (proposalID: string) => {
    setPrevContainer(activeContainer);
    setActiveContainer("Proposal Info View");
    setOpenProposal(proposalID);
  };

  const navigator = useNavigate();
  const [prevContainer, setPrevContainer] = useState("Home");
  const { user, setUser } = useContext(LoginContext);
  const [activeContainer, setActiveContainer] = useState("Home");
  const [openProject, setOpenProject] = useState("");
  const [openApplication, setOpenApplication] = useState("");
  const [openProposal, setOpenProposal] = useState("");
  const [devMode, setDevMode] = useState(false);
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

        <div
          className="logoutButton"
          onClick={() => {
            setDevMode(!devMode);
          }}
        >
          Dev Mode
        </div>
      </div>
      <div className="sidebar">
        {/* <img src="DePaul.svg" alt="Depaul Log" /> */}
        <div
          className="sidebarTitle"
          onClick={returnToLandingPage}
          style={{ cursor: "pointer" }}
        >
          DePaul Guardian
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
          {(user.role === "Client" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Apply")}
            >
              Propose a Project
            </div>
          )}
          {(user.role === "faculty" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Student Applications")}
            >
              Student Applications
            </div>
          )}
          {(user.role === "faculty" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Project Proposals")}
            >
              Project Proposals
            </div>
          )}
          {(user.role === "faculty" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Add Faculty")}
            >
              Add Faculty
            </div>
          )}
          {(user.role === "faculty" || devMode) && (
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
          marginTop: "8vh",
          maxHeight: "87.5vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {(activeContainer === "Project Info View" ||
          activeContainer === "Proposal Info View" ||
          activeContainer === "Application View") && (
          <button
            style={{
              position: "absolute",
              top: "0",
              left: "2em",
              textAlign: "center",
            }}
            onClick={() => {
              setActiveContainer(prevContainer);
            }}
          >
            Back
          </button>
        )}
        {activeContainer === "Home" ? (
          <HomeView />
        ) : activeContainer === "Projects" ? (
          <ProjectsView onClick={projectCardClicked} />
        ) : activeContainer === "Apply" ? (
          <ApplyView />
        ) : activeContainer === "Manage Tables" ? (
          <ManageView />
        ) : activeContainer === "Project Proposals" ? (
          <ProjectProposalsView onClick={proposalCardClicked} />
        ) : activeContainer === "Student Applications" ? (
          <StudentApplicationsView onClick={applicationCardClicked} />
        ) : activeContainer === "Project Info View" ? (
          <ProjectInfoView projectID={openProject} />
        ) : activeContainer === "Application View" ? (
          <ApplicationInfoView studentID={openApplication} />
        ) : activeContainer === "Proposal Info View" ? (
          <ProposalInfoView studentID={openProposal} />
        ) : activeContainer === "Add Faculty" ? (
          <AddFaculty />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
