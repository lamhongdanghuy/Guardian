//Add Faculty Form In Dashboard
//Contributor: Hong Lam

import { useState } from "react";
import API_BASE_URL from "./fetchApiURL";

function AddFaculty() {
  const [F_Name, setF_Name] = useState("");
  const [L_Name, setL_Name] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [P_Number, setP_Number] = useState("1234567890");
  const [role, setRole] = useState("");
  const [showResults, setShowResults] = useState(false);

  //API call to insert faculty record in database
  const sendData = async () => {
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,5}/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    const phonePattern = /^\d{10}$/;
    if (password != verifyPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!phonePattern.test(P_Number)) {
      alert("Please enter a valid phone number in the format XXX-XXX-XXXX.");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and 8-12 characters."
      );
      return;
    }
    if (!emailPattern.test(Email)) {
      alert("Email is not valid. Please enter a valid email.");
      return;
    }
    //console.log("sending data");
    //console.log(password, F_Name, L_Name, Email, P_Number);
    await fetch(`${API_BASE_URL}/apply/faculty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        F_Name,
        L_Name,
        Email,
        P_Number,
        role,
      }),
    });
    setShowResults(true);
  };
  //html
  return (
    <div>
      {!showResults ? (
        <div
          className="form"
          style={{
            maxHeight: "70vh",
            marginBottom: "5vh",
            backgroundColor: "#f6f7f8",
            gap: ".25vh",
          }}
        >
          <h2 style={{ color: "#33689c", fontSize: "32px" }}>
            Add Faculty Member
          </h2>
          <label htmlFor="F_Name">First Name</label>
          <input
            type="text"
            id="F_Name"
            name="F_Name"
            onChange={(e) => setF_Name(e.target.value)}
          />
          <label htmlFor="L_Name">Last Name</label>
          <input
            type="text"
            id="L_Name"
            name="L_Name"
            onChange={(e) => setL_Name(e.target.value)}
          />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Verify Password</label>
          <input
            type="password"
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
          <label htmlFor="P_Number">Phone Number</label>
          <input
            type="tel"
            id="P_Number"
            name="P_Number"
            onChange={(e) => setP_Number(e.target.value)}
          />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            onChange={(e) => setRole(e.target.value)}
            defaultValue="Admin Assistant"
          >
            <option value="Admin Assistant">Admin Assistant</option>
            <option value="Clinic Director">Clinic Director</option>
            <option value="Board Of Director">Board Of Director</option>
          </select>
          <br />
          <button onClick={sendData}>Submit</button>
        </div>
      ) : (
        <div>
          <h1>Added Faculty!</h1>
        </div>
      )}
    </div>
  );
}

export default AddFaculty;
