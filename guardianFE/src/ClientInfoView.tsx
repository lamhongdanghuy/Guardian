// Client Information View when clicking on a client in Dashboard
// Contributors: Albert Luna, Hong Lam

//Albert Luna: Base Code + Styling 70%
//Hong Lam: Edit Functionality 30%

import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

interface props {
  clientID: string,
}

function ClientInfoView(info: props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [clientFName, setClientFName] = useState<string | null>("");
  const [clientLName, setClientLName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [phone, setPhone] = useState<number | null>();
  const [company, setCompany] = useState<string | null>("");
  const [type, setType] = useState<string | null>("");
  const [url, setUrl] = useState<string | null>("");
  const [revenue, setRevenue] = useState<number | null>(null);
  const [it, setIT] = useState<number | null>(null);
  const [sensitivedata, setSensitiveData] = useState<string | null>("");
  const [sra, setSRA] = useState<string | null>("");


  // if (coursesTaken) {
  //   selectedCourses = coursesTaken.split(", ");
  // }


  const { user } = useContext(LoginContext);

  const handleCancel = async () => {
    setIsEditing(false);
    // Fetch the client information again to revert changes
    setLoading(true);
    await getClientInfo();
    setLoading(false);
  };

  const handleInActivate = async () => {
    const confirmInActivate = window.confirm(
      "Are you sure you want deactivate this client?"
    );
    if (confirmInActivate) {
      setSubmitting(true);
      await fetch(`${API_BASE_URL}/client&comp/inactivate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token ? user.token : "",
        },
        body: JSON.stringify({ clientID: info.clientID}),
      });
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    // Send the updated info to the backend
    setSubmitting(true);
    await fetch(`${API_BASE_URL}/client&comp/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({
        info: info.clientID,
        F_Name: clientFName,
        L_Name: clientLName,
        Email: email,
        P_Number: phone,
        C_Name: company,
        C_Type: type,
        C_URL: url,
        C_Revenue: revenue,
        C_IT: it,
        C_Sen_Data: sensitivedata,
        C_SRA: sra,
      }),
    });
    setSubmitted(true);
    // Exit edit mode
    setSubmitting(false);
    setIsEditing(false);
  };

  const getClientInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/client&comp/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ clientID: info.clientID}),
    });
    const result = await response.json();

    const application = result.applications[0];

    setClientFName(application.F_Name);
    setClientLName(application.L_Name);
    setEmail(application.Email);
    setPhone(application.P_Number);
    setCompany(application.C_Name);
    setType(application.C_Type);
    setUrl(application.C_URL);
    setRevenue(application.C_Revenue);
    setIT(application.C_IT);
    setSensitiveData(application.C_Sen_Data);
    setSRA(application.C_SRA);

    setLoading(false);
  };

  useEffect(() => {
    getClientInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : submitting ? (
        <h1>Submitting...</h1>
      ) : submitted ? (
        <h1>Submitted</h1>
      ) : (
        <div className="projectInfoView">
          {isEditing ? (
            <>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "40px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  First Name:{" "}
                  <input
                    type="text"
                    value={clientFName ?? ""}
                    onChange={(e) => setClientFName(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                      width: "40%",
                    }}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  Last Name:{""}
                  <input
                    type="text"
                    value={clientLName ?? ""}
                    onChange={(e) => setClientLName(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                      width: "40%",
                    }}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  Company: <input
                    type="text"
                    value={company ?? ""}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                      width: "60%",
                    }}
                  />
                </h1>
              </div>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    display: "flex",
                  }}
                >
                  Email: {""}
                  <input
                    type="email"
                    value={email ?? ""}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  />
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Phone: {""}
                  <input
                    type="tel"
                    value={phone ?? ""}
                    onChange={(e) => setPhone(parseInt(e.target.value))}
                    pattern="[0-9]{10}"
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  />
                </h1>
              </div>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  type: {""}
                  <select
                    value={type ?? ""}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  >
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="For Profit">For Profit</option>
                  </select>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                    textAlign: "right",
                    maxWidth: "50%",
                  }}
                >
                  URL: {""}
                  <input
                    type="text"
                    value={url ?? ""}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  />
                </h1>
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Revenue: {""}
                <input
                  type="number"
                  value={revenue ?? ""}
                  onChange={(e) => setRevenue(parseFloat(e.target.value))}
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #33689c",
                    alignSelf: "center",
                    justifySelf: "center",
                    fontSize: "24px",
                  }}
                />
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Number of IT staff:{" "}
                <input
                  type="number"
                  value={it ?? ""}
                  onChange={(e) => setIT(parseInt(e.target.value))}
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #33689c",
                    alignSelf: "center",
                    justifySelf: "center",
                    fontSize: "24px",
                  }}
                />
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Last Security Risk Assement:{" "}
                <select
                    value={sra ?? ""}
                    onChange={(e) => setSRA(e.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      border: "2px solid #33689c",
                      alignSelf: "center",
                      justifySelf: "center",
                      fontSize: "24px",
                    }}
                  >
                    <option value="Never">Never</option>
                    <option value="1-2">1 - 2 years ago</option>
                    <option value="3-5">3 - 5 years ago</option>
                    <option value="More than 5">5+ years ago</option>
                  </select>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                }}
              >
                Sensitive Data: {""}
                <textarea
                  placeholder="Describe here... (Less than 30 characters)"
                  rows={4}
                  cols={40}
                  value={sensitivedata ?? ""}
                  id="otherNORA"
                  name="otherNORA"
                  onChange={(e) => setSensitiveData(e.target.value)}
                  maxLength={30}
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #33689c",
                    alignSelf: "center",
                    justifySelf: "center",
                    fontSize: "24px",
                  }}
                ></textarea>
              </h1>
              <br />
            </>
          ) : (
            <>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "48px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                    textAlign: "left",
                  }}
                >
                  Name:{" "}
                  <span style={{ color: "#33689c" }}>
                    {clientFName} {clientLName}
                  </span>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "0vw",
                  }}
                >
                  Company: <span style={{ color: "#33689c" }}>{company}</span>
                </h1>
              </div>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Email: {""}
                  <span style={{ color: "#33689c" }}>{email}</span>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                  }}
                >
                  Phone: {""}
                  <span style={{ color: "#33689c" }}>{phone}</span>
                </h1>
              </div>
              <div className="topInfo">
                <h1
                  style={{
                    fontSize: "32px",
                    marginRight: "auto",
                    marginLeft: "0vw",
                  }}
                >
                  Type: {""}
                  <span style={{ color: "#33689c" }}>{type}</span>
                </h1>
                <h1
                  style={{
                    fontSize: "32px",
                    marginLeft: "auto",
                    marginRight: "1vw",
                    textAlign: "right",
                    maxWidth: "50%",
                  }}
                >
                  URL: {""}
                  <span style={{ color: "#33689c" }}>{url}</span>
                </h1>
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Revenue: {""}
                <span style={{ color: "#33689c" }}>
                  {revenue}
                </span>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Number of IT staff:{" "}
                <span style={{ color: "#33689c" }}>
                  {it}
                </span>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                  paddingBottom: "5vh",
                }}
              >
                Last Security Risk Assement:{" "}
                <span style={{ color: "#33689c" }}>
                  {sra}
                </span>
              </h1>
              <h1
                style={{
                  fontSize: "32px",
                  marginLeft: "0vw",
                  marginRight: "auto",
                }}
              >
                Sensitive Data: {""}
                <span style={{ color: "#33689c" }}>
                  {sensitivedata}
                </span>
              </h1>
              <br />
            </>
          )}
        </div>
      )}
      {!loading &&
        !submitted &&
        !submitting &&
        !isEditing &&
        (user.role === "Clinic Director" ||
          user.role === "Admin Assistant") && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 200px",
            }}
          >
            <button
              onClick={handleInActivate}
              style={{ backgroundColor: "#D30000" }}
            >
              Deactivate Client
            </button>
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#FCE205" }}
            >
              Edit
            </button>
          </div>
        )}
      {isEditing && !submitted && !submitting && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 200px",
          }}
        >
          <button onClick={handleCancel} style={{ backgroundColor: "#FCE205" }}>
            Cancel
          </button>
          <button onClick={handleEdit} style={{ backgroundColor: "#03C04A" }}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ClientInfoView;
