import { useState } from "react";
import Header from "./Header";

function LandingPage() {
  const [message, setMessage] = useState("");

  const fetchHello = async () => {
    try {
      const response = await fetch("http://localhost:5000/"); // Update the URL with your Flask API endpoint
      const result = await response.json();
      console.log("got data");
      setMessage(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header />
      <button onClick={fetchHello}>Talk to backend!</button>
      {message}
    </>
  );
}

export default LandingPage;
