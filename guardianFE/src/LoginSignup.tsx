import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "react-responsive";

function LoginSignup() {
  const isMobile = useMediaQuery({ query: "(min-aspect-ratio:5/4)" });
  const { setUser } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [showResults, setShowResults] = useState(false);

  const navigator = useNavigate();

  const sendLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    const temp = jwtDecode(result);
    //////////////////
    console.log(temp);
    //////////////////
    if ("message" in temp && temp.message === "Login successful!") {
      setSuccess("Login Successful");
      if (
        "email" in temp &&
        typeof temp.email === "string" &&
        "id" in temp &&
        typeof temp.id === "string" &&
        "role" in temp &&
        typeof temp.role === "string" &&
        "emailVerification" in temp &&
        typeof temp.emailVerification === "boolean" &&
        "status" in temp &&
        typeof temp.status === "string"
      ) {
        setUser({
          token: result,
          email: temp.email,
          id: temp.id,
          role: temp.role,
          emailVerification: temp.emailVerification,
          status: temp.status,
        });
      }
      navigator("/dashboard");
    } else {
      setSuccess("Login Failed");
    }
    setShowResults(true);
  };

  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "35%",
          margin: "auto",
          border: "1px solid #6e7c85",
          gap: ".5em",
          padding: "2em",
          borderRadius: "1em",
          backdropFilter: "blur(15px)",
        }}
      >
        {!isMobile ? (
          <h1 style={{ fontSize: "30px" }}>
            Please access the web application on a desktop.
          </h1>
        ) : (
          <>
            <h1>LOG IN</h1>
            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />{" "}
            <br />
            <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
              <button onClick={sendLogin}>Log In</button>
              <br />
              <button onClick={() => navigator("/apply")}>Apply</button>
            </div>
          </>
        )}
        {showResults && (
          <div>
            <h1>{success}</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default LoginSignup;
