//Header for the Home Pages
//Contributor: Albert Luna

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function Header() {
  const isMobile = useMediaQuery({ query: "(min-aspect-ratio:5/4)" });
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
      {isMobile && (
        <button
          onClick={() => navigator("/login")}
          style={{ position: "absolute", top: ".75em", right: ".75em" }}
        >
          Log In
        </button>
      )}
      <header>
        <h1
          className="title"
          style={{ marginTop: ".5em", color: "#33689c", fontWeight: 700 }}
        >
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
          <NavLink className={"navlink"} to="https://www.depaul.edu" target="_blank" rel="noopener noreferrer">
            DePaul
          </NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;
