import Header from "./Header";
import { useState } from "react";


function ClientApply() {
    const [message, setMessage] = useState("");

    const sendData = async () => {
        try {
        const response = await fetch("http://localhost:5000/"); // Update the URL with your Flask API endpoint
        const result = await response.json();
        console.log("got data");
        setMessage(result);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    return (
        <div>
            <Header />
            <div className="clientApply">
                <h2>Registration for Client</h2>
                <form>
                    <label htmlFor="pnumber">Phone Number: </label>
                    <input type="number" id="pnumber" name="pnumber" /> <br />

                    <label htmlFor="company">Company Name: </label>
                    <input type="text" id="company" name="company" /> <br />
                     
                    <label htmlFor="compURL">Company URL: </label>
                    <input type="url" id="compURL" name="compURL" /> <br />

                    <p>Company Type: </p>
                    <input type="radio" id="non-prof" name="compType" value="non-prof"></input>
                    <label htmlFor="non-prof">Non-Profit </label>
                    <input type="radio" id="prof" name="compType" value="prof"></input>
                    <label htmlFor="prof">For Profit</label> <br />

                    <label htmlFor="revenue">Company's Annual Revenue: </label>
                    <input type="number" id="revenue" name="revenue" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" /> <br />

                    <button onClick={sendData}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClientApply;
