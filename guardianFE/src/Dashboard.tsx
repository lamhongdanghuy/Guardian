import { useState } from "react";
import HomeView from "./HomeView";
import ProjectsView from "./ProjectsView";
function Dashboard() {
  const [activeContainer, setActiveContainer] = useState("Home");

  return (
    <div className="dashboard">
      <div className="sidebar">
        {/* <img src="DePaul.svg" alt="Depaul Log" /> */}
        <div className="sidebarTitle">Depaul Guardian</div>
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
          <div
            className="sidebarItem"
            onClick={() => setActiveContainer("Apply")}
          >
            Apply
          </div>
          <div
            className="sidebarItem"
            onClick={() => setActiveContainer("Manage Tables")}
          >
            Manage Tables
          </div>
        </div>
        {/* <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/clients">Clients</Link>
        <Link to="/dashboard/students">Students</Link>
        <Link to="/dashboard/services">Services</Link> */}
      </div>
      {activeContainer === "Home" ? (
        <HomeView />
      ) : activeContainer === "Projects" ? (
        <ProjectsView />
      ) : activeContainer === "Apply" ? (
        <div>APPLY</div>
      ) : activeContainer === "Manage Tables" ? (
        <div>MANAGE TABLES</div>
      ) : null}
    </div>
  );
}

export default Dashboard;
