import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginSignup from "./LoginSignup";
import Apply from "./Apply";
import StudentApply from "./StudentApply";
import ClientApply from "./ClientApply";
import Dashboard from "./Dashboard";
import { LoginProvider } from "./LoginContextProvider";
import GRA from "./GRA";
import Services from "./Services";
import PR from "./PR";
import Audit from "./Audit";
import About from "./About";

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/apply/student" element={<StudentApply />} />
          <Route path="/apply/client" element={<ClientApply />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services/GRA" element={<GRA />} />
          <Route path="/services" element={<Services />} />
          <Route path="services/PR" element={<PR />} />
          <Route path="/services/audit" element={<Audit />} />
          <Route path="/aboutus" element={<About />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
