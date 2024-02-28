import Header from "./Header";
import { useNavigate } from "react-router-dom";

function About() {
  const navigator = useNavigate();

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          margin: "auto",
          marginBottom: "5vh",
        }}
      >
        <div className="banner">
          <img
            src="Jarvis-Student-Center-for-Innovation-and-Collaboration-05.jpg"
            alt="Policy Image"
            className="midBanner"
            style={{ marginBottom: "5vh", opacity: "0.25" }}
          />
          <h2 className="bannerUpperText">What is Guardian?</h2>
          <p className="bannerMiddleText">
            The DePaul Guardian is a cybersecurity clinic where students and
            industry organizations can connect, collaborate, and learn within
            the cybersecurity domain. We want to provide a dynamic space where
            students and industry professionals can seamlessly come together to
            exchange ideas, insights, and practical knowledge.
          </p>
        </div>
        {/* <p>
          To help achieve this mission, the DePaul Cybersecurity Clinic will
          offer:
        </p>
        <ul>
          <li>General Security Risk Assessment</li>
          <li>Policy Making</li>
          <li>Audit</li>
        </ul> */}
        <div className="banner">
          <img
            src="/cropped-DePaul-CDM-IPD-01.jpg"
            alt="Policy Image"
            className="midBanner"
            style={{ marginBottom: "5vh", opacity: "0.25" }}
          />
          <h2 className="bannerUpperText">Our Mission Statement</h2>

          <p className="bannerMiddleText">
            Raise organizational awareness of information security and privacy
            risks discovered from a student- led risk assessment so that
            incremental improvements are made in the client’s security policies
            and practices while students in turn gain real-world experience that
            contributes to a cyber security workforce.
          </p>
        </div>
        <div
          style={{
            width: "80%",
            border: "1px solid white",
            borderRadius: "12px",
            backgroundColor: "#33689c",
            overflow: "hidden",
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
      </div>
    </div>
  );
}

export default About;
