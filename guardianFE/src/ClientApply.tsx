import Header from "./Header";
import { useState } from "react";

function ClientApply() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [compName, setCompName] = useState("");
  const [compType, setCompType] = useState("");
  const [pNumber, setpNumber] = useState("");
  const [url, setURL] = useState("");
  const [revenue, setRevenue] = useState("");
  const [numOfIT, setNumOfIT] = useState("");
  const [senData, setSenData] = useState("na");
  const [sra, setSRA] = useState();
  const [projectType, setProjectType] = useState("");
  const [curious, setCurious] = useState("");
  const [comment, setComment] = useState("");
  const [rtnData, setRtnData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setProjectType(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setProjectType(event.target.value);
  };

  const handleCompTypeChange = (event) => {
    setCompType(event.target.value);
  };

  const sendData = async (event) => {
    const enteredDate = new Date(dueDate);
    const currentDate = new Date();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let invalidFields = [];
    if (sra === "") {
      invalidFields.push("Number of Security Risk Assessments");
    }
    if (dueDate === "") {
      invalidFields.push("Please enter a due date");
    }
    if (projectType === "") {
      invalidFields.push("Project of Interest");
    }
    if (invalidFields.length > 0) {
      alert(
        `Please select a valid option for the following fields: ${invalidFields.join(
          ", "
        )}`
      );
      return;
    }
    if (enteredDate <= currentDate) {
      alert("Please enter a future date.");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phonePattern.test(pNumber)) {
      alert("Please enter a valid phone number in the format XXX-XXX-XXXX.");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and 8-12 characters."
      );
      return;
    }
    if (password !== verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    let revenueDecimal = parseFloat(revenue);
    const response = await fetch("http://localhost:5000/apply/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName,
        lName,
        email,
        password,
        pNumber,
        compName,
        compType,
        url,
        revenue: revenueDecimal,
        numOfIT,
        senData,
        sra,
        projectType,
        dueDate,
        curious,
        comment,
      }),
    });
    setRtnData(await response.json());
    setShowResults(true);
  };

  return (
    <div>
      <Header />
      {!showResults ? (
        <div className="form">
          <h2>Registration for First Time Client</h2>
          <label htmlFor="fName">Contact Person First Name: </label>
          <input
            type="text"
            id="fName"
            name="fName"
            onChange={(event) => setfName(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="LName">Contact Person Last Name: </label>
          <input
            type="text"
            id="lName"
            name="lName"
            onChange={(event) => setlName(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="emailAdd">Contact Person Email: </label>
          <input
            type="email"
            id="emailAdd"
            name="emailAdd"
            onChange={(event) => setEmail(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="passWord">Password: </label>
          <input
            type="password"
            id="passWord"
            name="passWord"
            onChange={(event) => setPassword(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="VerfPassWord">Verify Password: </label>
          <input
            type="password"
            id="VerfPassWord"
            name="VerfPassWord"
            onChange={(event) => setVerifyPassword(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="phoneNum">Contact Person Phone Number: </label>
          <input
            type="tel"
            id="phoneNum"
            name="phoneNum"
            onChange={(event) => setpNumber(event.target.value)}
            required
          ></input>{" "}
          <label htmlFor="company">Company Name: </label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={(event) => setCompName(event.target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="compURL">Company URL: </label>
          <input
            type="url"
            id="compURL"
            name="compURL"
            onChange={(event) => setURL(event.target.value)}
            required
          />{" "}
          <br />
          <p>Company Type: </p>
          <input
            type="radio"
            id="Non-Profit"
            name="compType"
            value="Non-Profit"
            required="required"
            onChange={handleCompTypeChange}
          ></input>
          <label htmlFor="Non-Profit">Non-Profit</label>
          <input
            type="radio"
            id="For Profit"
            name="compType"
            value="For Profit"
            onChange={handleCompTypeChange}
          ></input>
          <label htmlFor="For Profit">For Profit</label> <br />
          <label htmlFor="revenue">Company's Annual Revenue: </label>
          <input
            type="number"
            id="revenue"
            name="revenue"
            onChange={(event) => setRevenue(event.target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="numOfIT">Number of IT staff: </label>
          <input
            type="number"
            id="numOfIT"
            name="numOfIT"
            onChange={(event) => setNumOfIT(event.target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="senData">Description of sensitive data: </label>{" "}
          <br />
          <textarea
            placeholder="N/A for nothing"
            id="senData"
            name="senData"
            rows="5"
            cols="50"
            onChange={(event) => setSenData(event.target.value)}
            required
          ></textarea>{" "}
          <br />
          <label htmlFor="NORA">
            Has your organization had a security risk assessment?{" "}
          </label>
          <select
            id="NORA"
            name="NORA"
            onChange={(event) => setSRA(event.target.value)}
            required
          >
            <option>Please select one</option>
            <option value="Never">Never</option>
            <option value="1-2">1 - 2 years ago</option>
            <option value="3-5">3 - 5 years ago</option>
            <option value="More than 5">5+ years ago</option>
          </select>{" "}
          <br />
          <label htmlFor="interest">
            Project type of interest general risk assessment; audit; policy
            review; other; if other, briefly describe:
          </label>
          <select
            id="interest"
            name="interest"
            onChange={handleChange}
            required
          >
            <option>Please select one</option>
            <option value="General Risk Assessment">
              General Risk Assessment
            </option>
            <option value="Audit">Audit</option>
            <option value="Policy Review">Policy Review</option>
            <option value="Other">Other</option>
          </select>{" "}
          <br />
          {selectedOption === "other" && (
            <textarea
              placeholder="Describe here..."
              rows="5"
              cols="50"
              id="otherNORA"
              name="otherNORA"
              onChange={handleTextAreaChange}
            ></textarea>
          )}
          <br />
          <label htmlFor="dueDate">Due Date: </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
          <br />
          <label htmlFor="curious">
            How did you hear about Clinic?{" "}
          </label>
          <input
            type="text"
            id="curious"
            name="curious"
            onChange={(event) => setCurious(event.target.value)}
          />
          <label htmlFor="comment">
            Any other comments or request for the clinic?{" "}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={(event) => setComment(event.target.value)}
          />{" "}
          <br />
          <button onClick={sendData}>Submit</button>
        </div>
      ) : (
        <div style={{ marginTop: "20vh" }}>
          <h1>Form Submitted!</h1>
          <h2>{rtnData.message}</h2>
        </div>
      )}
    </div>
  );
}

export default ClientApply;
