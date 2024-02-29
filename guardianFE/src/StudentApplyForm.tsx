import { useState } from "react";

function StudentApplyForm() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [pNumber, setpNumber] = useState("");
  const [projectType, setProjectType] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [yearStanding, setYearStanding] = useState("");
  const [gradDate, setGradDate] = useState("");
  const [curious, setCurious] = useState("");
  const [hear, setHear] = useState("");
  const [eth, setEth] = useState("");
  const [gen, setGen] = useState("");
  const [rtnData, setRtnData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [courseTaken, setCourseTaken] = useState<String[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCourseTaken((prevCourses) => [...prevCourses, event.target.value]);
    } else {
      setCourseTaken((prevCourses) =>
        prevCourses.filter((course) => course !== event.target.value)
      );
    }
  };

  const handleInterestChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
    setProjectType(event.target.value);
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectType(event.target.value);
  };

  const sendData = async () => {
    const emailPattern = /.+@depaul\.edu/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    const phonePattern = /^\d{10}$/;
    const gradDatePattern = /(0[1-9]|1[0-2])-[0-9]{4}/;
    let invalidFields = [];
    if (school === "Please select one") {
      invalidFields.push("School Department");
    }
    if (yearStanding === "Please select one") {
      invalidFields.push("Current Year Standing");
    }
    if (gen === "Please select one") {
      invalidFields.push("Gender");
    }
    if (eth === "Please select one") {
      invalidFields.push("Ethnicity");
    }
    if (projectType === "Please select one") {
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
    if (!gradDatePattern.test(gradDate)) {
      alert("Please enter a valid graduation date in the format MM-YYYY.");
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
    if (!emailPattern.test(email)) {
      alert("Please use your DePaul email address.");
      return;
    }
    if (password !== verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch("http://localhost:5000/apply/student", {
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
        school,
        major,
        yearStanding,
        gradDate,
        courseTaken,
        projectType,
        curious,
        hear,
        gen,
        eth,
      }),
    });
    const responseData = await response.json();
    setRtnData(responseData.message);
    setShowResults(true);
  };

  return (
    <div>
      {!showResults ? (
        <div className="studentApply">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fName"
            name="fName"
            onChange={(event) => setfName(event.target.value)}
            placeholder="John"
            required
          ></input>{" "}
          <br />
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lName"
            name="lName"
            placeholder="Doe"
            onChange={(event) => setlName(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="emailAdd"
            name="emailAdd"
            placeholder="Use your DePaul email address."
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
          <label htmlFor="phoneNum">Contact Phone Number: </label>
          <input
            type="tel"
            id="phoneNum"
            name="phoneNum"
            placeholder="XXX-XXX-XXXX"
            onChange={(event) => setpNumber(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="school">School Department: </label>
          <select
            id="school"
            name="school"
            onChange={(event) => setSchool(event.target.value)}
            required
          >
            <option>Please select one</option>
            <option value="SoC">School of Computing</option>
            <option value="DCOB">Driehaus College of Business</option>
            <option value="Law">College of Law</option>
          </select>{" "}
          <br />
          <label htmlFor="major">Major: </label>
          <input
            type="text"
            id="major"
            name="major"
            placeholder="Computer Science, Business, etc."
            onChange={(event) => setMajor(event.target.value)}
            required
          ></input>{" "}
          <br />
          <label htmlFor="yearStanding">Current Year Standing: </label>
          <select
            id="yearStanding"
            name="yearStanding"
            onChange={(event) => setYearStanding(event.target.value)}
            required
          >
            <option>Please select one</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Graduate">Graduate</option>
          </select>{" "}
          <br />
          <label htmlFor="gradDate">Anticipated Graduation Date: </label>
          <input
            type="text"
            id="gradDate"
            name="gradDate"
            placeholder="MM-YYYY"
            onChange={(event) => setGradDate(event.target.value)}
            required
          ></input>
          <br />
          <label htmlFor="courseTaken">
            Clinic Pre-requisite Course(s) Taken:{" "}
          </label>
          <div
            className="taken"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "20px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="CSEC_390"
                name="CSEC_390"
                value="CSEC_390"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="CSEC_390">CSEC_390</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="CSEC_490"
                name="CSEC_490"
                value="CSEC_490"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="CSEC_490">CSEC_490</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="CSEC_488"
                name="CSEC_488"
                value="CSEC_488"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="CSEC_488">CSEC_488</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="IS_486"
                name="IS_486"
                value="IS_486"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="IS_486">IS_486</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="IS_487"
                name="IS_487"
                value="IS_487"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="IS_487">IS_487</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_374"
                name="ACC_374"
                value="ACC_374"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_374">ACC_374</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_376"
                name="ACC_376"
                value="ACC_376"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_376">ACC_376</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_378"
                name="ACC_378"
                value="ACC_378"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_378">ACC_378</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_636"
                name="ACC_636"
                value="ACC_636"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_636">ACC_636</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_638"
                name="ACC_638"
                value="ACC_638"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_638">ACC_638</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="ACC_639"
                name="ACC_639"
                value="ACC_639"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ACC_639">ACC_639</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="FIN_362"
                name="FIN_362"
                value="FIN_362"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="FIN_362">FIN_362</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="SEV_621"
                name="SEV_621"
                value="SEV_621"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="SEV_621">SEV_621</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="Sec_Daemons"
                name="Sec_Daemons"
                value="Sec_Daemons"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Sec_Daemons">Sec_Daemons</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id="WiCyS"
                name="WiCyS"
                value="WiCyS"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="WiCyS">WiCyS</label>
            </div>
          </div>
          <br />
          <label htmlFor="interest">Project of Interest: </label>
          <select
            id="interest"
            name="interest"
            onChange={handleInterestChange}
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
              rows={5}
              cols={50}
              id="interest"
              name="interest"
              onChange={handleTextAreaChange}
            ></textarea>
          )}{" "}
          <br />
          <label htmlFor="curious">How did you hear about the Clinic? </label>
          <input
            type="text"
            id="curious"
            name="curious"
            onChange={(event) => setCurious(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="firstHear">
            When did you first hear about the Clinic?{" "}
          </label>
          <input
            type="text"
            id="hear"
            name="hear"
            onChange={(event) => setHear(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="gen">Gender: </label>
          <select
            id="gen"
            name="gen"
            onChange={(event) => setGen(event.target.value)}
            required
          >
            <option>Please select one</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="N/A">I do not want to answer</option>
          </select>{" "}
          <br />
          <label htmlFor="eth">Ethnicity: </label>
          <select
            id="eth"
            name="eth"
            onChange={(event) => setEth(event.target.value)}
            required
          >
            <option>Please select one</option>
            <option value="American Indian or Alaska Native">
              American Indian or Alaska Native
            </option>
            <option value="white">White</option>
            <option value="Asian">Asian</option>
            <option value="Black or Afican American">
              Black or African American
            </option>
            <option value="Hispanic">Hispanic</option>
            <option value="Native Hawaiian or Other Pacific Islander">
              Native Hawaiian or Other Pacific Islander
            </option>
            <option value="Other">Other</option>
            <option value="N/A">I do not want to answer</option>
          </select>{" "}
          <br />
          <button onClick={sendData}>Apply</button>
        </div>
      ) : (
        <div style={{ marginTop: "20vh" }}>
          <h1>Form Submitted!</h1>
          <h2>{rtnData}</h2>
        </div>
      )}
    </div>
  );
}

export default StudentApplyForm;
