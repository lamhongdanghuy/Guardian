// Audit Individal Info Page
// Contributors: Hong Lam, Albert Luna

import Header from "./Header";
import { useNavigate } from "react-router-dom";

function GRA() {
  const navigator = useNavigate();

  return (
    <div>
      <Header />
      <div className="services">
        <h1>General Risk Assessment</h1>
        <p>
          We will conduct security reviews and risk assessments of projects and
          products alike. Our team of experts assesses your systems, assets,
          applications, networks, and processes to identify vulnerabilities and
          potential threats by using advanced tools and methodologies. DePaul
          also produces security assurance audit plans for its clients to
          evaluate and enhance their cybersecurity posture.
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
    </div>
  );
}

export default GRA;
