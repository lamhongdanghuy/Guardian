// Audit Individal Info Page
// Contributors: Albert Luna, Joel Chamakala

//Albert Luna Base Code, Images, Styling 80%
//Joel ChamakalaL: Basic Image Layout 20%

import { useContext, useState } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

function HomeView() {
  const { user } = useContext(LoginContext);
  const [sentVerify, setSentVerify] = useState(false);
  
  //verifies user is logged in.
  const sendVerify = async () => {
    const response = await fetch(
      `${API_BASE_URL}/dashboard/resend-verification-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
        body: JSON.stringify({
          email: user.email,
        }),
      }
    );
    const result = await response.json();

    if (result === "Success") {
      setSentVerify(true);
    }
  };
  return (
    <div>
      <div className="banner">
        <img src="cyber_img.svg" alt="Policy Image" className="midBanner" />

        <h2 className="bannerUpperText" style={{ fontSize: "30px" }}>
          DePaul Guardian Dashboard
        </h2>
        <h2 className="bannerLowerText" style={{ fontSize: "26px" }}>
          DePaul University's Cybersecurity Clinic
        </h2>
      </div>
      {user.emailVerification == false && (
        <div className="resendVerification">
          <h3 className="resendVerificationText">
            Please click this button to resend a new verification link to -{" "}
            {user.email}
          </h3>
          <button className="resendVerificationButton" onClick={sendVerify}>
            Resend
          </button>
          {sentVerify == true && <h3>Sent Verification Email</h3>}
        </div>
      )}
      {user.emailVerification == true && user.status == "In Review" && (
        <div className="verifiedInReview">
          <h3 className="verifiedInReview">Your Application Is In Review</h3>
        </div>
      )}
    </div>
  );
}

export default HomeView;
