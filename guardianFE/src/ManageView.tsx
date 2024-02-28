import { useTable } from "react-table";
import { useState, useEffect } from "react";
import { act } from "react-dom/test-utils";

function ManageView() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("Project");

  useEffect(() => {
    getTable(activeTable);
  }, [activeTable]);

  const getTable = async (tableName: string) => {
    const response = await fetch(`http://localhost:5000/get${tableName}Table`, {
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
      <button onClick={() => setActiveTable("Project")}>Projects</button>
      <button onClick={() => setActiveTable("Client")}>Client</button>
      <button onClick={() => setActiveTable("Faculty")}>Faculty</button>
      <button onClick={() => setActiveTable("Student")}>Student</button>
      <button onClick={() => setActiveTable("Company")}>Company</button>
      <button onClick={() => setActiveTable("Login")}>Login Information</button>
      <button onClick={() => setActiveTable("ProjectParticipant")}>
        Project Participant
      </button>
      <button onClick={() => setActiveTable("StudentClass")}>
        Student Class
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
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageView;
