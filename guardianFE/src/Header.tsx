import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header>
        <Link
          to="/login"
          style={{ marginLeft: "auto", marginRight: "2em", marginBottom: "0" }}
        >
          Log In
        </Link>
        <h1>DePaul Guardian</h1>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/apply">Apply</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </header>
    </>
  );
}

export default Header;
