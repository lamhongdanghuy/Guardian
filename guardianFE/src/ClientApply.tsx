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
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" id="lname" name="lname" /> <br />

                    <label htmlFor="fname">First Name:</label>
                    <input type="text" id="fname" name="fname" /> <br />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" /> <br />

                    <label htmlFor="pnumber">Phone Number:</label>
                    <input type="number" id="pnumber" name="pnumber" /> <br />

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
