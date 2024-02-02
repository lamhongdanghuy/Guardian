import Header from "./Header";
import { useState } from "react";

function StudentApply() {
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    return (
        <div>
            <Header />
            <div className="studentApply">
                <h1>Apply to be a Student</h1>
                <label htmlFor="fname">First Name:</label>
                <input
                    type="text"
                    id="fName"
                    name="fName"
                    onChange={(event) => setfName(event.target.value)}
                    required
                ></input>{" "}
                <br />
                <label htmlFor="lname">Last Name:</label>
                <input
                    type="text"
                    id="lName"
                    name="lName"
                    onChange={(event) => setlName(event.target.value)}
                    required
                ></input>{" "}
                <br />
                <label htmlFor="email">Email Address:</label>
                <input
                    type="email"
                    id="emailAdd"
                    name="emailAdd"
                    pattern=".+@depaul\.edu"
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
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                ></input>{" "}
                <br />
                <label htmlFor="VerfPassWord">Verify Password: </label>
                <input
                    type="password"
                    id="VerfPassWord"
                    name="VerfPassWord"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                    onChange={(event) => setVerifyPassword(event.target.value)}
                    required
                ></input>{" "}
                <br />
                <label htmlFor="school">School Department: </label>
                <select
                    id="school"
                    name="school"
                    required
                >
                    <option>Please select one</option>
                    <option value="SoC">Sociology</option>
                    <option value="DCOB">Driehaus College of Business</option>
                    <option value="Law">College of Law</option>
                    <option value="CDM">College of Computing</option>
                </select>{" "}
                <br />
                <label htmlFor="major">Major: </label>
                <input
                    type="text"
                    id="major"
                    name="major"
                    onChange={(event) => setlName(event.target.value)}
                    required
                ></input>{" "}
                <br />
                <label htmlFor="yearStanding">Current Year Standing: </label>
                <select
                    id="yearStanding"
                    name="yearStanding"
                    required
                >
                    <option>Please select one</option>
                    <option value="freshman">Freshman</option>
                    <option value="sopho">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="grad">Graduate</option>
                </select>{" "}
                <br />
                <label htmlFor="gradDate">Anticipated Graduation Date: </label>
                <input
                    type="date"
                    id="gradDate"
                    name="gradDate"
                    pattern="[0-9]{2}-[0-9]{4}"
                    placeholder="MM-YYYY"
                    required >
                </input>
                <br />
                <label htmlFor="courseTaken">Clinic Pre-requisite Course(s) Taken: </label>

                <br />
                <label htmlFor="interest">Project of Interest: </label>
                <select id="interest" name="interest" onChange={handleChange} required>
                    <option>Please select one</option>
                    <option value="GRA">General Risk Assessment</option>
                    <option value="audit">Audit</option>
                    <option value="PR">Policy Review</option>
                    <option value="other">Other</option>
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
                <label htmlFor="firstHear">When did you first hear about the Clinic? </label>
                    
                <br />
                <label htmlFor="gen">Gender: </label>
                <select
                    id="gen"
                    name="gen"
                    required
                >
                    <option>Please select one</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="notSay">I do not want to answer</option>
                </select>{" "}
                <br />
                <label htmlFor="eth">Ethnicity: </label>
                <select
                    id="eth"
                    name="eth"
                    required
                >
                    <option>Please select one</option>
                    <option value="americanIndian">American Indian</option>
                    <option value="white">White</option>
                    <option value="asian">Asian</option>
                    <option value="bOrAA">Black or African American</option>
                    <option value="nativeOrPI">Native Hawaiian or Other Pacific Islander</option>
                    <option value="hisp">Hispanic or Latino</option>
                    <option value="notSay">I do not want to answer</option>
                </select>{" "}
                <br />
                <button>Apply</button>
            </div>
        </div>
    );
}

export default StudentApply;
