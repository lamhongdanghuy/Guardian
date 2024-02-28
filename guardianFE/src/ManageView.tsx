import { useTable } from "react-table";
import { useState, useEffect } from "react";

function ManageView() {
  const [formLabels, setFormLabels] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("Project");
  const [inputForm, setInputForm] = useState(false);

  useEffect(() => {
    getTable(activeTable);
  }, [activeTable]);

  const newEntry = async () => {
    const response = await fetch(`http://localhost:5000/add${activeTable}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    console.log(data);
  };

  const getTable = async (tableName: string) => {
    const response = await fetch(`http://localhost:5000/get${tableName}Table`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFormLabels(data.columns);
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
          <button onClick={() => setActiveTable("Project")}>Projects</button>
          <button onClick={() => setActiveTable("Client")}>Client</button>
          <button onClick={() => setActiveTable("Faculty")}>Faculty</button>
          <button onClick={() => setActiveTable("Student")}>Student</button>
          <button onClick={() => setActiveTable("Company")}>Company</button>
          <button onClick={() => setActiveTable("Login")}>
            Login Information
          </button>
          <button onClick={() => setActiveTable("ProjectParticipant")}>
            Project Participant
          </button>
          <button onClick={() => setActiveTable("StudentClass")}>
            Student Class
          </button>
          <button onClick={() => setInputForm(!inputForm)}>
            Add New Entry
          </button>

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
        <div>
          <button onClick={() => setInputForm(!inputForm)}>Back</button>

          <h2>Add New Entry</h2>
          <form>
            {formLabels.map((label) => (
              <div>
                <label htmlFor={label}>{label}</label>
                <input
                  type="text"
                  id={label}
                  name={label}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [label]: e.target.value })
                  }
                  value={formValues[label]}
                />
              </div>
            ))}
          </form>
          <button onClick={() => newEntry}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default ManageView;
