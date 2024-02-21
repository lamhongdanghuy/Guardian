import Header from "./Header";

function About() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
          margin: "auto",
          marginTop: "8em",
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

          <p className="bannerMiddleText">
            The DePaul Cybersecurity Clinic is a hub where users from students
            to industry organizations can connect, collaborate, and learn within
            the cybersecurity domain. We want to provide a dynamic space where
            students and industry professionals can seamlessly come together to
            exchange ideas, insights, and practical knowledge.
          </p>
        </div>
        <p>
          To help achieve this mission, the DePaul Cybersecurity Clinic will
          offer:
        </p>
        <ul>
          <li>General Security Risk Assessment</li>
          <li>Policy Making</li>
          <li>Audit</li>
        </ul>
        <div className="banner">
          <img
            src="Jarvis-Student-Center-for-Innovation-and-Collaboration-05.jpg"
            alt="Policy Image"
            className="midBanner"
            style={{ marginBottom: "5vh", opacity: "0.25" }}
          />

          <p className="bannerMiddleText">
            As the ever-changing threat landscape continues to evolve, it
            necessitates continuous engagement and innovation with careful
            consideration of emerging cybersecurity challenges. At DePaul, we
            aim to establish a cornerstone within our community while striving
            to shield our clients from both current and emerging threats to
            their security and privacy.
          </p>
        </div>

        <h1>Mission Statement</h1>
        <p>
          Raise organizational awareness of information security and privacy
          risks discovered from a student- led risk assessment so that
          incremental improvements are made in the client’s security policies
          and practices while students in turn gain real-world experience that
          contributes to a cyber security workforce.
        </p>
      </div>
    </div>
  );
}

export default About;
