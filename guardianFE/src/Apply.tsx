import { Link } from "react-router-dom";
import React from 'react';
import Header from './Header';

const Apply: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Apply</h1>

            <div className="studentApply">
                <h2>Students</h2>
                <p>
                    If you are a student at DePaul University and are interested in
                    joining the DePaul Guardian, please fill out the form below.
                </p>
                <Link to="/apply/student">Apply as Student</Link>
            </div>

            <div className="clientApply">
                <h2>Clients</h2>
                <p>
                    If you are a client and are interested in working with the DePaul
                    Guardian, please fill out the form below.
                </p>
                <Link to="/apply/client">Apply as Client</Link>
            </div>

        </div>
    );
};

export default Apply;
