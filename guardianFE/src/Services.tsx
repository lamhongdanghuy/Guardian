import { Link, NavLink } from "react-router-dom";
import Header from "./Header";

function Services() {
    return(
        <>
        <Header />
        <div className="servicesPage"> 
            <div className= "servicePageOption">
                <h2>General Security Risk Assessment</h2>
                <p>The General Security Risk Assessment offered by Depaul's 
                    Cybersecurity Clinic is a comprehensive evaluation designed to 
                    identify, analyze, and mitigate potential security risks within 
                    your organization's digital infrastructure. Our service aims to 
                    provide actionable insights to enhance your cybersecurity posture 
                    and protect sensitive information from threats, breaches, and vulnerabilities.</p>
                <Link to="/services/GRA" className="rightArrow">&#10148;
                </Link>
            </div>
            <div className= "servicePageOption">
                <h2>Policy Review</h2>
                <p>The Policy Review Service offered by Depaul's Cybersecurity Clinic 
                    is a comprehensive examination designed to assess the effectiveness, 
                    relevance, and compliance of your organization's cybersecurity policies 
                    and procedures. Our service aims to ensure that your policies align with 
                    industry best practices, regulatory requirements, and the evolving threat 
                    landscape, ultimately enhancing your organization's ability to mitigate cyber 
                    risks and safeguard sensitive information.</p>
                <Link to="/services/PR" className="rightArrow">&#10148;
                </Link>
            </div>
            <div className= "servicePageOption">
                <h2>Audit</h2>
                <p>The Audit Service provided by Depaul's Cybersecurity Clinic 
                    offers a comprehensive examination of your organization's 
                    digital infrastructure, policies, procedures, and practices 
                    to assess cybersecurity readiness, identify vulnerabilities, 
                    and ensure compliance with industry standards and regulatory 
                    requirements. Our audit service is designed to provide actionable 
                    insights and recommendations to enhance your organization's resilience 
                    against cyber threats and protect sensitive information.</p>
                <Link to="/services/Audit" className="rightArrow">&#10148;
                </Link>
            </div>
        </div>
        </>
    );
}

export default Services;