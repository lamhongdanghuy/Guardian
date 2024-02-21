import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function LandingPage() {
  const [message, setMessage] = useState("");

  const fetchHello = async () => {
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
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          margin: "auto",
          marginTop: "8em",
          marginBottom: "4em",
        }}
      >
        {message}
        <img src="cyber_img.svg" alt="Policy Image" className="midBanner" />

        <h2 style={{ fontSize: "36px", marginBottom: "0" }}>
          Welcome to the DePaul Guardian!
        </h2>
        <h2 style={{ fontSize: "24px", margin: "0", color: "gray" }}>
          DePaul University's Cybersecurity Clinic
        </h2>
        <p>
          Students: Get real world experience by working on cybersecurity
          projects with real clients.
        </p>
        <p>
          Clients: Get help with your cybersecurity needs from DePaul students
          at affordable rates.
        </p>
        <h2>Services</h2>

        <div className="services-container">
          <div className="serviceImage">
            <img
              src="/policy-making.jpg"
              alt="Policy Image"
              className="servicePic"
            />
            <p>
              <b>Policy Making</b>
            </p>
          </div>
          <div className="serviceImage">
            <img
              src="/general-risk-assement.jpg"
              alt="General Security Risk Assessment Image"
              className="servicePic"
            />
            <p>
              <b>General Security Risk Assessment</b>
            </p>
          </div>
          <div className="serviceImage">
            <img
              src="/audit-realistic.jpg"
              alt="Audit Image"
              className="servicePic"
            />
            <p>
              <b>Audit</b>
            </p>
          </div>
        </div>
        <h2>Mission Statement</h2>
        <p>
          The DePaul Cybersecurity Clinic is a hub where users from students to
          industry organizations can connect, collaborate, and learn within the
          cybersecurity domain. We want to provide a dynamic space where
          students and industry professionals can seamlessly come together to
          exchange ideas, insights, and practical knowledge. At DePaul, we aim
          to establish a cornerstone within our community while striving to
          shield our clients from both current and emerging threats to their
          security and privacy.
        </p>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default LandingPage;
