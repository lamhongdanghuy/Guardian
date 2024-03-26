//Services Page
// Contributors: Hong Lam, Albert Luna, Joel Chamakala

import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigator = useNavigate();

  return (
    <>
      <Header />
      <div className="servicesPage">
        <div className="serviceInfo" onClick={() => navigator("gra")}>
          <img
            src="/general-risk-assement.jpg"
            alt="General Security Risk Assessment Image"
            className="serviceImageLayer"
          />
          <h2 className="servicesTitle">General Security Risk Assessment</h2>
          <p className="servicesText">
            The General Security Risk Assessment offered by Depaul's
            Cybersecurity Clinic is a comprehensive evaluation designed to
            identify, analyze, and mitigate potential security risks within your
            organization's digital infrastructure. Our service aims to provide
            actionable insights to enhance your cybersecurity posture and
            protect sensitive information from threats, breaches, and
            vulnerabilities.
          </p>
        </div>
        <div className="serviceInfo" onClick={() => navigator("PR")}>
          <img
            src="/policy-making.jpg"
            alt="Policy Image"
            className="serviceImageLayer"
          />
          <h2 className="servicesTitle">Policy Review</h2>
          <p className="servicesText">
            The Policy Review Service offered by Depaul's Cybersecurity Clinic
            is a comprehensive examination designed to assess the effectiveness,
            relevance, and compliance of your organization's cybersecurity
            policies and procedures. Our service aims to ensure that your
            policies align with industry best practices, regulatory
            requirements, and the evolving threat landscape, ultimately
            enhancing your organization's ability to mitigate cyber risks and
            safeguard sensitive information.
          </p>
        </div>
        <div className="serviceInfo" onClick={() => navigator("audit")}>
          <img
            src="/audit-realistic.jpg"
            alt="Audit Image"
            className="serviceImageLayer"
          />
          <h2 className="servicesTitle">Audit</h2>
          <p className="servicesText">
            The Audit Service provided by Depaul's Cybersecurity Clinic offers a
            comprehensive examination of your organization's digital
            infrastructure, policies, procedures, and practices to assess
            cybersecurity readiness, identify vulnerabilities, and ensure
            compliance with industry standards and regulatory requirements. Our
            audit service is designed to provide actionable insights and
            recommendations to enhance your organization's resilience against
            cyber threats and protect sensitive information.
          </p>
        </div>
      </div>
    </>
  );
}

export default Services;
