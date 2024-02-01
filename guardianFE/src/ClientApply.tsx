import Header from "./Header";
import { useState } from "react";


function ClientApply() {
    const [compName, setCompName] = useState("");
    const [compType, setCompType] = useState("");
    const [pNumber, setpNumber] = useState("");
    const [url, setURL] = useState("");
    const [revenue, setRevenue] = useState("");
    const [numOfIT, setNumOfIT] = useState("");
    const [senData, setSenData] = useState("");
    const [sra, setSRA] = useState("");
    const [projectType, setProjectType] = useState("");
    const [curious, setCurious] = useState("");
    const [comment, setComment] = useState("");
    
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setProjectType(event.target.value);
    };

    const handleTextAreaChange = (event) => {
        setProjectType(event.target.value);
    }

    const handleCompTypeChange = (event) => {
        setCompType(event.target.value);
    }

    const sendData = async (event) => {
        const response = await fetch("http://localhost:5000/apply/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ compName, compType, pNumber, url, revenue, numOfIT, senData, sra, projectType, curious, comment}),
        });
        const result = await response.json();

      };

    return (
        <div>
            <Header />
            <div className="clientApply">
                <h2>Registration for Client</h2>
                <form>
                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(event) => setpNumber(event.target.value)} required></input> <br />

                    <label htmlFor="company">Company Name: </label>
                    <input type="text" id="company" name="company" onChange={(event) => setCompName(event.target.value)} required/> <br />
                     
                    <label htmlFor="compURL">Company URL: </label>
                    <input type="url" id="compURL" name="compURL" onChange={(event) => setURL(event.target.value)} required/> <br />

                    <p>Company Type: </p>
                    <input type="radio" id="non-prof" name="compType" value="non-prof" required="required" onChange={handleCompTypeChange}></input>
                    <label htmlFor="non-prof">Non-Profit </label>
                    <input type="radio" id="prof" name="compType" value="prof" onChange={handleCompTypeChange}></input>
                    <label htmlFor="prof">For Profit</label> <br />

                    <label htmlFor="revenue">Company's Annual Revenue: </label>
                    <input type="number" id="revenue" name="revenue" onChange={(event) => setRevenue(event.target.value)} required/> <br />

                    <label htmlFor="numOfIT">Number of IT staff: </label>
                    <input type="number" id="numOfIT" name="numOfIT" onChange={(event) => setNumOfIT(event.target.value)} required/> <br />

                    <label htmlFor="senData">Description of sensitive data: </label> <br />
                    <textarea placeholder="N/A for nothing" id="senData" name="senData" rows="5" cols="50" onChange={(event) => setSenData(event.target.value)} required></textarea> <br />

                    <label htmlFor="NORA">Has your organization had a security risk assessment? </label>
                    <select id="NORA" name="NORA" onChange={(event) => setSRA(event.target.value)} required>
                        <option value ="never">Never</option>
                        <option value ="1-2">1 - 2 years ago</option>
                        <option value ="3-5">3 - 5 years ago</option>
                        <option value ="5+">5+ years ago</option>
                    </select> <br />

                    <label htmlFor="interest">Project type of interest general risk assessment;
                    audit; policy review; other; if other, briefly describe:</label>
                    <select id="NORA" name="NORA" onChange={handleChange} required>
                        <option value ="GRA">General Risk Assessment</option>
                        <option value ="audit">Audit</option>
                        <option value ="PR">Policy Review</option>
                        <option value ="other">Other</option>
                    </select> <br />
                    {selectedOption === 'other' && <textarea placeholder="Describe here..." rows="5" cols="50" id="otherNORA" name="otherNORA" onChange={handleTextAreaChange}></textarea>} <br />

                    <label htmlFor="curious">How did you hear about our clinic: </label>
                    <input type="text" id="curious" name="curious" onChange={(event) => setCurious(event.target.value)} /> <br />

                    <label htmlFor="comment">Any other comments or request for the clinic? </label>
                    <input type="text" id="company" name="company" onChange={(event) => setComment(event.target.value)}/> <br />

                    <button onClick={sendData}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClientApply;
