// Landing Page
// Contributors: Albert Luna, Joel Chamakala

import Header from "./Header";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigator = useNavigate();

  return (
    <>
      <Header />
      <div className="landingPage">
        <div className="banner">
          <img
            src="cyber_img.svg"
            alt="Policy Image"
            className="midBanner"
            style={{ filter: "brightness(80%)" }}
          />

          <h2 className="bannerUpperText">Welcome to the DePaul Guardian!</h2>
          <h2 className="bannerLowerText">
            DePaul University's Cybersecurity Clinic
          </h2>
        </div>
        <div className="clinicDescription">
          <h3>
            DePaul's Cybersecurity Clinic "Guardian" is an interdisciplinary
            collaboration between the School of Computing, the Driehaus College
            of Business, and the College of Law. The Clinic provides students
            with hands-on, real-world experience working on cybersecurity
            projects for organizational clients that helps prepare them for
            careers in the cybersecurity workforce. Participating DePaul
            students come from a variety of undergraduate and graduate degree
            majors across the three colleges.
          </h3>
          <h3>
            The Clinic partners with DePaul's Steans Center to serve community-
            based non-profit organizations that have limited resources yet have
            a need for cybersecurity assessment services. The Clinic also
            provides services to Chicago-area small businesses.
          </h3>
        </div>
        <h2>Services</h2>

        <div className="services-container">
          <div
            className="serviceImage"
            onClick={() => navigator("services/PR")}
          >
            <img
              src="/policy-making.jpg"
              alt="Policy Image"
              className="servicePic"
            />
            <p className="servicePicLabel">
              <b>Policy Making</b>
            </p>
          </div>
          <div
            className="serviceImage"
            onClick={() => navigator("services/GRA")}
          >
            <img
              src="/general-risk-assement.jpg"
              alt="General Security Risk Assessment Image"
              className="servicePic"
            />
            <p className="servicePicLabel">
              <b>General Security Risk Assessment</b>
            </p>
          </div>
          <div
            className="serviceImage"
            onClick={() => navigator("services/audit")}
          >
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
        <div className="exploreCard">
          <p style={{ fontSize: "18px", fontWeight: "550" }}>
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
