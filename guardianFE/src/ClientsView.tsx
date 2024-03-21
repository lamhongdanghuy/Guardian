//Clients Tab in Dashboard
//Contributor: Hong Lam

import ClientCard from "./ClientCard";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import API_BASE_URL from "./fetchApiURL";

interface clientAppViewProp {
  onClick: Function;
}

interface Client {
  F_Name: string;
  L_Name: string;
  C_Name: string;
  P_Number: string;
  Email: string;
  Client_ID: string;
  Company_ID: string;
  onClick: Function;
}

function ClientsView(props: clientAppViewProp) {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(LoginContext);
  const [clientsList, setclientsList] = useState<Client[]>([]);
  //console.log(clientsList);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/getClients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.token ? user.token : "",
      },
      body: JSON.stringify({ userID: user.id }),
    });
    const result = await response.json();
    //console.log(result)
    // Check if result.applications exists and is not empty
    if (result.applications && result.applications.length > 0) {
      setclientsList(result.applications);
    } else {
      // Set clientsList to an empty array if result.applications is empty or undefined
      setclientsList([]);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {clientsList.length === 0 ? (
            <h1 style={{ fontSize: "10vh" }}>No available clients</h1>
          ) : (
            <>
              <h1 style={{ fontSize: "10vh" }}>Clients</h1>
              <div
                style={{
                  margin: "0 5vw",
                  display: "flex",
                  flexWrap: "wrap",
                  textAlign: "center",
                  overflowY: "scroll",
                  maxHeight: "70vh",
                  marginBottom: "5vh",
                  gap: "5vh",
                }}
              >
                {clientsList.map((client: Client) => (
                  <ClientCard
                    key={client.Client_ID}
                    name={`${client.F_Name} ${client.L_Name}`}
                    company={client.C_Name}
                    phone={client.P_Number}
                    email={client.Email}
                    clientID={client.Client_ID}
                    companyID={client.Company_ID}
                    onClick={props.onClick}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientsView;
