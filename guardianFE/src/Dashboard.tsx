//Dashboard Page
//Contributors: Albert Luna, Joel Chamakala

//Albert Luna: 85% Base Code, Styling
//Joel Chamakala: Design Input 15%

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
import StudentsView from "./StudentsView";
import StudentInfoView from "./StudentInfoView";
import ClientsView from "./ClientsView";
import ClientInfoView from "./ClientInfoView";
import MyInformationView from "./MyInformationView";
import { LoginContext } from "./LoginContextProvider";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const returnToLandingPage = () => {
    setUser({
      id: "",
      email: "",
      role: "",
      token: "",
      emailVerification: false,
      status: "",
    });
    navigator("/");
  };


  //Functions passed down to cards to update dashboard when clicked.
  const studentCardClicked = (studentID: string) => {
    setPrevContainer(activeContainer);
    setActiveContainer("Student Info View");
    setOpenStudentInfo(studentID);
  };

  const clientCardClicked = (clientID: string) => {
    setPrevContainer(activeContainer);
    setActiveContainer("Client Info View");
    setOpenClientInfo(clientID);
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
    console.log("proposal card clicked");
    console.log(proposalID);
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
  const [openStudentInfo, setOpenStudentInfo] = useState("");
  const [openClientInfo, setOpenClientInfo] = useState("");
  const [devMode, setDevMode] = useState(false);
  useEffect(() => {
    if (user.id === "") {
      navigator("/login");
    }
  }, [user]);

  //Returns a dashboard with a sidebar menu and a main content window.
  return (
    <div
      className="dashboard"
      style={{
        backgroundImage:
          "linear-gradient(-145deg, rgba(0, 136, 204, 0.5) 50%, transparent 50%), linear-gradient(-75deg, rgba(0, 136, 204, 0.5) 50%, transparent 50%)",
      }}
    >
      <div className="userBar">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>{user.email}</div>
        </div>
        <button
          onClick={() => {
            setUser({
              id: "",
              email: "",
              role: "",
              token: "",
              emailVerification: false,
              status: "",
            });
          }}
        >
          Log Out
        </button>

        <button
          onClick={() => {
            setDevMode(!devMode);
          }}
        >
          Dev Mode
        </button>
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
          </div>{" "}
          <div
            className="sidebarItem"
            onClick={() => setActiveContainer("My Information")}
          >
            My Information
          </div>
          {(user.status === "Active" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Projects")}
            >
              Projects
            </div>
          )}
          {(user.role === "client" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Apply")}
            >
              Propose a Project
            </div>
          )}
          {(user.role === "Admin Assistant" ||
            user.role === "Clinic Director" ||
            user.role === "Board Director" ||
            devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Students View")}
            >
              Students
            </div>
          )}
          {(user.role === "Admin Assistant" ||
            user.role === "Clinic Director" ||
            user.role === "Board Director" ||
            devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Clients View")}
            >
              Clients
            </div>
          )}
          {(user.role === "Admin Assistant" ||
            user.role === "Clinic Director" ||
            devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Student Applications")}
            >
              Student Applications
            </div>
          )}
          {(user.role === "Admin Assistant" ||
            user.role === "Clinic Director" ||
            devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Project Proposals")}
            >
              Project Proposals
            </div>
          )}
          {(user.role === "Clinic Director" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Add Faculty")}
            >
              Add Faculty
            </div>
          )}
          {(user.role === "Clinic Director" || devMode) && (
            <div
              className="sidebarItem"
              onClick={() => setActiveContainer("Manage Tables")}
            >
              View Tables
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
          activeContainer === "Student Info View" ||
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
          <ProposalInfoView proposalID={openProposal} />
        ) : activeContainer === "Add Faculty" ? (
          <AddFaculty />
        ) : activeContainer === "Students View" ? (
          <StudentsView onClick={studentCardClicked} />
        ) : activeContainer === "Student Info View" ? (
          <StudentInfoView studentID={openStudentInfo} />
        ) : activeContainer === "Clients View" ? (
          <ClientsView onClick={clientCardClicked} />
        ) : activeContainer === "Client Info View" ? (
          <ClientInfoView clientID={openClientInfo} />
        ) : activeContainer === "My Information" ? (
          <MyInformationView></MyInformationView>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
