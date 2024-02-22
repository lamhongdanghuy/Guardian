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
        <div>
          <h3>
            Students: Get real world experience by working on cybersecurity
            projects with real clients.
          </h3>
        </div>
        <div>
          <h3>
            Clients: Get help with your cybersecurity needs from DePaul students
            at affordable rates.
          </h3>
        </div>
        <h2>Services</h2>

        <div className="services-container">
          <div className="serviceImage">
            <img
              src="/policy-making.jpg"
              alt="Policy Image"
              className="servicePic"
            />
            <p className="servicePicLabel">
              <b>Policy Making</b>
            </p>
          </div>
          <div className="serviceImage">
            <img
              src="/general-risk-assement.jpg"
              alt="General Security Risk Assessment Image"
              className="servicePic"
            />
            <p className="servicePicLabel">
              <b>General Security Risk Assessment</b>
            </p>
          </div>
          <div className="serviceImage">
            <img
              src="/audit-realistic.jpg"
              alt="Audit Image"
              className="servicePic"
            />
            <p className="servicePicLabel">
              <b>Audit</b>
            </p>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            border: "1px solid white",
            borderRadius: "12px",
            backgroundColor: "navy",
            overflow: "hidden",
            marginTop: "2em",
          }}
        >
          <p style={{ fontSize: "18px" }}>
            As the ever-changing threat landscape continues to evolve, it
            necessitates continuous engagement and innovation with careful
            consideration of emerging cybersecurity challenges. At DePaul, we
            aim to establish a cornerstone within our community while striving
            to shield our clients from both current and emerging threats to
            their security and privacy. If you would like to learn more about
            our services or how to get involved, please visit the links below.
          </p>
          <div className="splitImageContainer">
            <div className="splitImage" onClick={() => navigator("/apply")}>
              <img
                src="/policy-making.jpg"
                alt="Policy Image"
                className="splitImagePic"
              />
              <h2 className="splitImageLabel">Apply</h2>
            </div>
            <div className="splitImage" onClick={() => navigator("/services")}>
              <img
                src="/general-risk-assement.jpg"
                alt="General Security Risk Assessment Image"
                className="splitImagePic"
              />
              <h2 className="splitImageLabel">Services</h2>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default LandingPage;
