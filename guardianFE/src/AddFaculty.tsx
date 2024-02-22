import { useState } from "react";

function AddFaculty() {
  const [facultyID, setFacultyID] = useState("");
  const [F_Name, setF_Name] = useState("");
  const [L_Name, setL_Name] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [P_Number, setP_Number] = useState<Number>(1234567890);
  const [Role, setRole] = useState("");
  const [Status, setStatus] = useState("");
  const [Email_verified, setEmail_verified] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [rtnData, setRtnData] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextAreaChange = (event) => {};

  const sendData = async (event) => {
    let invalidFields = [];
    if (invalidFields.length > 0) {
      alert(
        `Please select a valid option for the following fields: ${invalidFields.join(
          ", "
        )}`
      );
      return;
    }
    const response = await fetch("http://localhost:5000/propose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facultyID,
        password,
        F_Name,
        L_Name,
        Email,
        P_Number,
        Role,
        Status,
        Email_verified,
      }),
    });
    setRtnData(await response.json());
    setShowResults(true);
  };

  return (
    <div>
      <div
        className="form"
        style={{ overflowY: "scroll", maxHeight: "70vh", marginBottom: "5vh" }}
      >
        <h2>Add Faculty Member</h2>
        <label htmlFor="facultyID">Faculty ID</label>
        <input
          type="text"
          id="facultyID"
          name="facultyID"
          onChange={(e) => setFacultyID(e.target.value)}
        />
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
        <input type="password" id="password" name="password" />
        <label htmlFor="P_Number">Phone Number</label>
        <input
          type="tel"
          id="P_Number"
          name="P_Number"
          onChange={(e) => setP_Number(e.target.value)}
        />
        <label htmlFor="Role">Role</label>
        <input
          type="text"
          id="Role"
          name="Role"
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="Status">Status</label>
        <input
          type="text"
          id="Status"
          name="Status"
          onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="Email_verified">Email Verified</label>
        <input
          type="checkbox"
          id="Email_verified"
          name="Email_verified"
          onChange={(e) => setEmail_verified(e.target.checked)}
        />
        <br />
        <button onClick={sendData}>Submit</button>
      </div>
      {showResults && (
        <div>
          <h1>{rtnData}</h1>
        </div>
      )}
    </div>
  );
}

export default AddFaculty;
