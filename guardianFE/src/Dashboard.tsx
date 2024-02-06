import { useState, useContext, useEffect } from "react";
import HomeView from "./HomeView";
import ProjectsView from "./ProjectsView";
import ApplyView from "./ApplyView";
import ManageView from "./ManageView";
import { LoginContext } from "./LoginContextProvider";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  interface User {
    userId: string;
    email: string;
    role: string;
  }

  const navigator = useNavigate();

  const { user, setUser } = useContext(LoginContext);
  const [activeContainer, setActiveContainer] = useState("Home");

  useEffect(() => {
    if (user.userId === null) {
      navigator("/login");
    }
  }, [user]);

  return (
    <div className="dashboard">
      <div className="userBar">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>logged in as: {user.email}</div>
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
        <ApplyView />
      ) : activeContainer === "Manage Tables" ? (
        <ManageView />
      ) : null}
    </div>
  );
}

export default Dashboard;
