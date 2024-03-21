// Audit Individal Info Page
// Contributors: Hong Lam, Albert Luna

//Hong Lam: Base Code: 30%
//Albert Luna: Stlying + Split Image Container: 70 

import Header from "./Header";
import { useNavigate } from "react-router-dom";

function PR() {
  const navigator = useNavigate();

  return (
    <div>
      <Header />
      <div className="services">
        <h1>Policy Review</h1>
        <p>
          DePaul collaborates with a wide range of both internal and external
          stakeholders to establish, record, approve, publish, and raise
          awareness of information technology work practices, policies, and
          procedures. We not only solidify governance frameworks but also ensure
          that our IT strategies align seamlessly with the ever-evolving
          challenges.
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

export default PR;
