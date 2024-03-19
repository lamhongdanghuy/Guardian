//Login Page
//Contributors: Albert Luna, Joel Chamakala

import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import API_BASE_URL from "./fetchApiURL";

function LoginSignup() {
  const isMobile = useMediaQuery({ query: "(min-aspect-ratio:5/4)" });
  const { setUser } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [borderColor, setBorderColor] = useState("#6e7c85");
  const [VCode, setVCode] = useState("");
  const [VCodeInput, setVCodeInput] = useState("");
  const [PassForm, setPassForm] = useState(false);

  const navigator = useNavigate();

  const handleForgotPassword = () => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setPassForm(true);
    forgotpassword();
  };

  const forgotpassword = async () => {
    const response = await fetch("http://localhost:5000/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    setVCode(result.VCode);
  };

  const changePassword = async () => {
    if (VCode == VCodeInput) {
      if (password !== repeatPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await fetch("http://localhost:5000/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      setSuccess(result.message);
      setPassForm(false);
      alert("Your password has been changed.");
    } else {
      alert("Verification Code is incorrect");
    }
  };

  const sendLogin = async () => {
    const response = await fetch(`${API_BASE_URL}/login`, {
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
      setBorderColor("red");
    }
  };

  return (
    <>
      <Header />
      {!PassForm ? (
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
            backgroundColor: "#f6f7f8",
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
                style={{
                  borderColor: borderColor,
                }}
                onChange={(event) => setEmail(event.target.value)}
              />{" "}
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                style={{
                  borderColor: borderColor,
                }}
                onChange={(event) => setPassword(event.target.value)}
              />{" "}
              <br />
              {success === "Login Failed" && (
                <div>
                  <h3
                    style={{
                      color: "red",
                    }}
                  >
                    Email or Password is incorrect
                  </h3>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => navigator("/apply")}
                  style={{ backgroundColor: "#6e7c85", color: "white" }}
                >
                  Apply
                </button>
                <button onClick={sendLogin}>Log In</button>
              </div>
              <button
                onClick={() => handleForgotPassword()}
                style={{
                  backgroundColor: "#6e7c85",
                  color: "white",
                  opacity: email === "" ? ".5" : "1",
                }}
                disabled={email === "" ? true : false}
                title="Please enter your email address to reset your password."
              >
                Forgot Password
              </button>
            </>
          )}
        </div>
      ) : (
        <div>
          <button onClick={() => setPassForm(false)}>Back</button>{" "}
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
            <h1>Change Password</h1>
            <label htmlFor="VCode">Verification Code:</label>
            <input
              type="text"
              id="VCode"
              name="VCode"
              placeholder="Please Check Your Email"
              onChange={(event) => setVCodeInput(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={(event) => setRepeatPassword(event.target.value)}
            />{" "}
            <br />
            <button onClick={changePassword}>Change Password</button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginSignup;
