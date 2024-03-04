import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigator = useNavigate();
  const [serviceOpen, setServiceOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        height: "8em",
        zIndex: 2,
      }}
    >
      <button
        onClick={() => navigator("/login")}
        style={{ position: "absolute", top: "1em", right: "1em" }}
      >
        Log In
      </button>
      <header>
        <h1 className="title" style={{ marginTop: ".5em" }}>
          DePaul Guardian
        </h1>
        <nav style={{ alignItems: "flex-start" }}>
          <NavLink className={"navlink"} to="/">
            Home
          </NavLink>
          <NavLink className={"navlink"} to="/apply">
            Apply
          </NavLink>
          <NavLink className={"navlink"} to="/aboutus">
            About
          </NavLink>
          <div
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <NavLink className={"navlink"} to="/services">
              Services
            </NavLink>
            {serviceOpen && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  background: "#ffffff",
                  left: "50%",
                  border: "1px solid black",
                  padding: ".25em",
                }}
              >
                <NavLink className={"navlink"} to="/services/GRA">
                  General Risk Assessment
                </NavLink>
                <NavLink className={"navlink"} to="/services/PR">
                  Policy Review
                </NavLink>
                <NavLink className={"navlink"} to="/services/audit">
                  Audit
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
