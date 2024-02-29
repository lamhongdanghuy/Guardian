import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Apply: React.FC = () => {
  const navigator = useNavigate();
  return (
    <>
      <Header />
      <div className="apply">
        <h1>Apply</h1>
        <div className="applyContainer">
          <div className="studentApply">
            <h2>Students</h2>
            <p>
              If you are a student at DePaul University and are interested in
              joining the DePaul Guardian, please fill out the form below.
            </p>
            <button onClick={() => navigator("/apply/student")}>
              {" "}
              Apply As Student
            </button>
          </div>

          <div className="clientApply">
            <h2>Clients</h2>
            <p>
              If you are a client and are interested in working with the DePaul
              Guardian, please fill out the form below.
            </p>
            <button onClick={() => navigator("/apply/client")}>
              {" "}
              Apply As Client
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
