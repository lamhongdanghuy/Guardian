//Dashboard Propose a Project Tab
//Contributor: Albert Luna 100%

import { LoginContext } from "./LoginContextProvider";
import { useState, useContext } from "react";
import API_BASE_URL from "./fetchApiURL";

function ApplyView() {
  const [url, setURL] = useState("");
  const [compName, setCompName] = useState("");
  const [revenue, setRevenue] = useState("");
  const [numOfIT, setNumOfIT] = useState("");
  const [senData, setSenData] = useState("na");
  const [sra, setSRA] = useState(-1);
  const [projectType, setProjectType] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { user } = useContext(LoginContext);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setProjectType(event.target.value);
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectType(event.target.value);
  };
  
  //API call to send application to the database
  const sendData = async () => {
    let invalidFields = [];
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
    const response = await fetch(`${API_BASE_URL}/propose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientID: user.id,
        email: user.email,
        compName,
        url,
        revenue,
        numOfIT,
        senData,
        sra,
        projectType,
        comment,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    setShowResults(true);
  };

  return (
    <div>
      {!showResults ? (
        <div
          className="form"
          style={{
            overflowY: "scroll",
            maxHeight: "70vh",
            marginBottom: "5vh",
            backgroundColor: "#f6f7f8",
          }}
        >
          <h2>Propose A New Project</h2>
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
            rows={5}
            cols={50}
            onChange={(event) => setSenData(event.target.value)}
            required
            style={{ minHeight: "150px" }}
          ></textarea>{" "}
          <br />
          <label htmlFor="NORA">
            Has your organization had a security risk assessment?{" "}
          </label>
          <select
            id="NORA"
            name="NORA"
            onChange={(event) => setSRA(Number(event.target.value))}
            required
          >
            <option>Please select one</option>
            <option value={0}>Never</option>
            <option value={1}>1 - 2 years ago</option>
            <option value={3}>3 - 5 years ago</option>
            <option value={5}>5+ years ago</option>
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
            <option value="other">Other</option>
          </select>{" "}
          <br />
          {selectedOption === "other" && (
            <textarea
              placeholder="Describe here..."
              rows={5}
              cols={50}
              id="otherNORA"
              name="otherNORA"
              onChange={handleTextAreaChange}
              style={{ minHeight: "150px" }}
            ></textarea>
          )}{" "}
          <br />
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
        <div>
          <h1>{message}</h1>
        </div>
      )}
    </div>
  );
}

export default ApplyView;
