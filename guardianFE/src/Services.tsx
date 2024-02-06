import { Link, NavLink } from "react-router-dom";
import Header from "./Header";

function Services() {
    return(
        <>
        <Header />
        <div className="servicesPage"> 
            <div className= "servicePageOption">
                <h2>General Security Risk Assessment</h2>
                <p>Description of GRA...</p>
                <Link to="/services/GRA" className="rightArrow">&#10148;
                </Link>
            </div>
            <div className= "servicePageOption">
                <h2>Policy Review</h2>
                <p>Description of PR...</p>
                <Link to="/services/PR" className="rightArrow">&#10148;
                </Link>
            </div>
            <div className= "servicePageOption">
                <h2>Audit</h2>
                <p>Description of Audit...</p>
                <Link to="/services/Audit" className="rightArrow">&#10148;
                </Link>
            </div>
        </div>
        </>
    );
}

export default Services;