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
        }}
      >
        {message}
        <h2>Services</h2>
        <div className="services-container">
          <div className="serviceImage">
            <img src="/PolicyServiceImage.svg" alt="Policy Image" />
            <p><b>Policy Making</b></p>
          </div>
          <div className="serviceImage">
            <img src="/RiskAssessImage.svg" alt="General Security Risk Assessment Image" />
            <p><b>General Security Risk Assessment</b></p>
          </div>
          <div className="serviceImage">
            <img src="/AuditServiceImage.svg" alt="Audit Image" />
            <p><b>Audit</b></p>
          </div>
        </div>
        <h2>Mission Statement</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan
          tortor posuere ac ut. Suspendisse in est ante in nibh mauris cursus.
          Quam vulputate dignissim suspendisse in est ante in nibh. Faucibus
          nisl tincidunt eget nullam non. Lectus mauris ultrices eros in. Arcu
          cursus euismod quis viverra nibh. Eleifend donec pretium vulputate
          sapien nec sagittis aliquam malesuada. Eget nunc scelerisque viverra
          mauris in aliquam sem fringilla. Consequat mauris nunc congue nisi
          vitae suscipit tellus. Quis vel eros donec ac odio tempor orci dapibus
          ultrices. Amet nulla facilisi morbi tempus iaculis urna id volutpat
          lacus. Nisi scelerisque eu ultrices vitae. Nam at lectus urna duis
          convallis convallis. Dui nunc mattis enim ut tellus elementum
          sagittis. Etiam sit amet nisl purus in mollis. Cras adipiscing enim eu
          turpis egestas pretium. Sed felis eget velit aliquet sagittis id
          consectetur purus. At volutpat diam ut venenatis tellus in metus.
          Dictum varius duis at consectetur lorem donec.
        </p>
        <button style={{ width: "30%" }} onClick={fetchHello}>
          Talk to backend!
        </button>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
