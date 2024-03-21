// Audit Individal Info Page
// Contributors: Hong Lam, Albert Luna

//Hong Lam: Base Code: 30%
//Albert Luna: Stlying + Split Image Container: 70 

import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Audit() {
  const navigator = useNavigate();

  return (
    <div>
      <Header />
      <div className="services">
        <h1>Audit</h1>
        <p>
          Audits are conducted in accordance with the Illinois State Audit Law.
          The DePaul Cybersecurity Clinic conducts audits of widely recognized
          frameworks and guidelines, providing its clients with a reliable and
          thorough assessment tailored to industry standards.
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

export default Audit;
