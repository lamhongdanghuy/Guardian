//About Page
//Contributors: Albert Luna, Hong Lam

//Hong Base Code: 10%
//Albert Luna: Images, Descriptions, Styling, Faculty, Split Action Container; 90%
import Header from "./Header";
import FacultyCard from "./FacultyCard";
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
            style={{ marginBottom: "5vh" }}
          />
          <div>
            <h2 className="bannerUpperText">What is Guardian?</h2>
            <p className="bannerMiddleText">
              The DePaul Guardian is a cybersecurity clinic where students and
              industry organizations can connect, collaborate, and learn within
              the cybersecurity domain. We want to provide a dynamic space where
              students and industry professionals can seamlessly come together
              to exchange ideas, insights, and practical knowledge.
            </p>
          </div>
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
            style={{ marginBottom: "5vh" }}
          />
          <h2 className="bannerUpperText">Our Mission Statement</h2>

          <p className="bannerMiddleText">
            Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client’s security policies
            and practices while students in turn gain real-world experience that
            contributes to a cyber security workforce.
          </p>
        </div>
        <h1 style={{ marginBottom: "1vh" }}>Faculty</h1>
        <div className="facultyCardContainer">
          <FacultyCard
            name="Janine Spears"
            title="Director"
            college="School of Computing"
            photoLink="https://odata.cdm.depaul.edu/Cdm.svc/CdmEmployeePictures(731191)/MediumPicture/$value"
            link="https://www.cdm.depaul.edu/Faculty-and-Staff/Pages/faculty-info.aspx?fid=571"
          />
          <FacultyCard
            name="Filipo Sharevski"
            title="Professor"
            college="School of Computing"
            photoLink="https://odata.cdm.depaul.edu/Cdm.svc/CdmEmployeePictures(1137049)/MediumPicture/$value"
            link="https://www.cdm.depaul.edu/Faculty-and-Staff/Pages/faculty-info.aspx?fid=1341"
          />
          <FacultyCard
            name="Ryan Haley"
            title="Professor"
            college="School of Computing"
            photoLink="https://odata.cdm.depaul.edu/Cdm.svc/CdmEmployeePictures(844215)/MediumPicture/$value"
            link="https://www.cdm.depaul.edu/Faculty-and-Staff/pages/faculty-info.aspx?fid=1367"
          />
          <FacultyCard
            name="Mark Shore"
            title="Professor"
            college="Driehaus College of Business"
            photoLink="https://business.depaul.edu/faculty/faculty-a-z/PublishingImages/mark-shore255.jpg"
            link="https://business.depaul.edu/faculty/faculty-a-z/Pages/mark-shore.aspx"
          />
          <FacultyCard
            name="David Wang"
            title="Professor"
            college="Driehaus College of Business"
            photoLink="https://business.depaul.edu/faculty/faculty-a-z/PublishingImages/Accountancy/David%20Wang.jpg"
            link="https://business.depaul.edu/faculty/faculty-a-z/Pages/david-wang.aspx"
          />
          <FacultyCard
            name="Max Helveston"
            title="Professor"
            college="College of Law"
            photoLink="https://law.depaul.edu/faculty-and-staff/faculty-a-z/PublishingImages/Helveston_M_7280_092022web.jpg"
            link="https://law.depaul.edu/faculty-and-staff/faculty-a-z/Pages/max-helveston.aspx"
          />
          <FacultyCard
            name="Howard Rosing"
            title="Staff"
            college="Steans Center"
            photoLink="https://resources.depaul.edu/steans-center-community-based-service-learning/about/staff/PublishingImages/Howard%20Rosing%20(255x300).jpg"
            link="https://resources.depaul.edu/steans-center-community-based-service-learning/about/staff/Pages/howard-rosing.aspx"
          />
          <FacultyCard
            name="Miranda Standberry-Wallace"
            title="Adjunct Faculty"
            college="College of Computing & Steans Center"
            photoLink="https://odata.cdm.depaul.edu/Cdm.svc/CdmEmployeePictures(1645)/MediumPicture/$value"
            link="https://www.cdm.depaul.edu/Faculty-and-Staff/Pages/faculty-info.aspx?fid=1199"
          />
        </div>
        <div className="exploreCard">
          <p style={{ fontSize: "18px", fontWeight: "550", color: "black" }}>
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
