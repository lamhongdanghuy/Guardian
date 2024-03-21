// View Tables Tab in Dashboard
// Contributors: Albert Luna

import { useTable } from "react-table";
import { useState, useEffect } from "react";
import StudentApplyForm from "./StudentApplyForm";
import AddFaculty from "./AddFaculty";
import ClientApplyForm from "./ClientApplyForm";
import API_BASE_URL from "./fetchApiURL";

function ManageView() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("Project");
  const [inputForm, setInputForm] = useState(false);
  const editableTables = ["Project", "Client", "Faculty", "Student"];

  //rerendering of component when new table is selected.
  useEffect(() => {
    getTable(activeTable);
  }, [activeTable]);

  //API call to get table from the backend.
  const getTable = async (tableName: string) => {
    const response = await fetch(`${API_BASE_URL}/get${tableName}Table`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    const transformedColumns = data.columns.map((column: any) => ({
      Header: column,
      accessor: column,
    }));

    const tranformedRows = data.rows.map((row: any) => {
      let temp: { [key: string]: any } = {};
      for (let i = 0; i < row.length; i++) {
        temp[data.columns[i]] = row[i];
      }
      return temp;
    });
    setData(tranformedRows);
    setColumns(transformedColumns);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {!inputForm ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "3em",
              alignItems: "center",
              gap: "1em",
              margin: "0 1em 0 1em",
            }}
          >
            <h2>Active Table:</h2>
            <select
              onChange={(e) => {
                setActiveTable(e.target.value);
              }}
              style={{ fontSize: "1.5em" }}
            >
              <option value="Project">Projects</option>
              <option value="Client">Client</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
              <option value="Company">Company</option>
              <option value="Login">Login Information</option>
              <option value="ProjectParticipant">Project Participant</option>
              <option value="StudentClass">Student Class</option>
            </select>
            {editableTables.includes(activeTable) && (
              <button onClick={() => setInputForm(!inputForm)}>
                Add New Entry
              </button>
            )}
          </div>

          <div style={{ maxHeight: "500px", overflow: "scroll" }}>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {" "}
                          {cell.render("Cell")}{" "}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <button
            onClick={() => setInputForm(!inputForm)}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              margin: "2em",
            }}
          >
            Back
          </button>
          {activeTable === "Client" || activeTable === "Project" ? (
            <>
              <h2>Add a Client</h2>
              <ClientApplyForm />
            </>
          ) : activeTable === "Student" ? (
            <>
              <h2>Add a Student</h2>
              <StudentApplyForm />
            </>
          ) : activeTable === "Faculty" ? (
            <AddFaculty />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default ManageView;
