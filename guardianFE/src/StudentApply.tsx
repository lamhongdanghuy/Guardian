import Header from "./Header";
import { useState } from "react";

function StudentApply() {
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
    const [eth, setEth] = useState('');
    const [gen, setGen] = useState('');
    const [rtnData, setRtnData] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleInterestChange = (event) => {
        setSelectedOption(event.target.value);
        setProjectType(event.target.value);
    };

    const handleTextAreaChange = (event) => {
        setProjectType(event.target.value);
    };



    const sendData = async (event) => {
        const emailPattern = /.+@depaul\.edu/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
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
            alert(`Please select a valid option for the following fields: ${invalidFields.join(", ")}`);
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
            alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and 8-12 characters.");
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
                projectType,
                curious,
                hear,
                gen,
                eth
            }),
        });
        setRtnData(await response.json());
        setShowResults(true);

    };

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
                    <option value="freshman">Freshman</option>
                    <option value="sopho">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="grad">Graduate</option>
                </select>{" "}
                <br />
                <label htmlFor="gradDate">Anticipated Graduation Date: </label>
                <input
                    type="text"
                    id="gradDate"
                    name="gradDate"
                    placeholder="MM-YYYY"
                    onChange={(event) => setGradDate(event.target.value)}
                    required >
                </input>
                <br />
                <label htmlFor="courseTaken">Clinic Pre-requisite Course(s) Taken: </label>

                <br />
                <label htmlFor="interest">Project of Interest: </label>
                <select id="interest" name="interest" onChange={handleInterestChange}
                    required>
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
                <label htmlFor="firstHear">When did you first hear about the Clinic? </label>
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
                    onChange={(event) => setEth(event.target.value)}
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
                <button onClick={sendData}>Apply</button>
            </div>
            {showResults && (
                <div>
                    <h1>{rtnData.message}</h1>
                </div>
            )}
        </div>

    );
}

export default StudentApply;
