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
        <div className="banner">
          <img src="cyber_img.svg" alt="Policy Image" className="midBanner" />

          <h2 className="bannerUpperText">Welcome to the DePaul Guardian!</h2>
          <h2 className="bannerLowerText">
            DePaul University's Cybersecurity Clinic
          </h2>
        </div>
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
          Raise organizational awareness of information security and privacy
          risks discovered from a student- led risk assessment so that
          incremental improvements are made in the client’s security policies
          and practices while students in turn gain real-world experience that
          contributes to a cyber security workforce.
        </p>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default LandingPage;
