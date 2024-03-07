import { useContext, useState } from "react";
import { LoginContext } from "./LoginContextProvider";
import { jwtDecode } from "jwt-decode";

function HomeView() {
  const { user } = useContext(LoginContext);
  const [sentVerify, setSentVerify] = useState(false);

  const sendVerify = async () => {
    const response = await fetch("http://localhost:5000/dashboard/resend-verification-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": user.token
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });
    const result = await response.json();
    const temp = jwtDecode(result)
    if ("message" in temp && temp.message === "Hit"){
      console.log("Hit")
    }
  }
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
      {(user.emailVerification == false) && (
        <div className="resendVerification">
          <h3 className="resendVerificationText">
            Please click this button to resend a new verification link to - {user.email}
          </h3>
          <button className="resendVerificationButton" onClick={sendVerify}>Resend</button>
        </div>
      )}
      {(sentVerify == true) && (
        <div>
          <h3>
            Sent Verification Link!
          </h3>
        </div>
      )}
    </div>
  );
}

export default HomeView;
