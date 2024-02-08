import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
function Header() {
  const [serviceOpen, setServiceOpen] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        height: "10em",
      }}
    >
      <header>
        <Link
          to="/login"
          style={{
            marginLeft: "auto",
            marginRight: "2em",
            marginBottom: "0",
          }}
        >
          Log In
        </Link>
        <h1>DePaul Guardian</h1>
        <nav style={{ alignItems: "flex-start" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/apply">Apply</NavLink>
          <NavLink to="/aboutus">About</NavLink>
          <div
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <NavLink to="/services">Services</NavLink>
            {serviceOpen && (
              <div style={{ display: "flex", flexDirection: "column", background: "#242424", border: "2px solid black"}}>
                <Link to="/services/GRA">General Risk Assessment</Link>
                <Link to="/services/PR">Policy Review</Link>
                <Link to="/services/audit">Audit</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
