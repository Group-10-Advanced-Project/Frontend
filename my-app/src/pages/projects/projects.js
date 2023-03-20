import "./projects.css";
import React, { useState, useEffect } from "react";
import ProjectPopup from "../../components/addProjectPopup/projectPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import Loader from "../../components/loader/loader";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import Cookies from "js-cookie";

// The purpose of this function is to create an object representing a row of data for display in a table or list. Each parameter corresponds to a column of data, and the function returns an object with properties representing each column. The resulting object can be used to populate a table or list of data.
function createData(
  id,
  name,
  about,
  status,
  team_id,
  // employees,
  created_at,
  updated_at
) {
  return {
    id,
    name,
    about,
    status,
    team_id,
    // employees,
    created_at,
    updated_at,
  };
}

//   const testRow = createData(
//     1,
//     "Front-end",
//     "erp MdDesignServices",
//     "development",
//     1,
//     "Belal Amen",
//     "2023",
//     "2023"
//   );
//   console.log(testRow);

// The 'Project' component is responsible for rendering the admin dashboard and displaying a table of project data. The Loading state variable is used to conditionally render a loading indicator while data is being fetched from the server. The Data state variable will hold the project data retrieved from the server, and editingRow is used to keep track of the currently edited row.
function Project(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState();
  const token = Cookies.get("token");
  const adminSuper = Cookies.get("super-admin");

  // The useEffect hook is used to execute the getData function and update the state variables when the component mounts. The [] as a second argument to useEffect is used to ensure that the effect is only executed once when the component mounts.
  useEffect(() => {
    console.log("Fetching data...");
    setLoading(true);
    getData();
  }, []);

  function openProjectPopup() {
    document.querySelector(".project-popup").showModal();
  }

  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };
  // This code creates an array of rows that will be used as data for the MUIDataTable component.
  //If the Data state variable is not null or undefined, it will be used to create the rows using the createData function. Otherwise, an empty array will be created using the map method.
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.name,
        item.about,
        item.status,
        item.team_id,
        // item.employees,
        item.created_at,
        item.updated_at
      )
    );

  // This function creates a debounced version of a search handler function. The debounce function is used from the Lodash library to create a new function that will only be executed after a certain amount of time has elapsed since the last call to the function. In this case, the handleSearch function will only be called after a 500ms delay from the last time it was called.
  // The handleSearch function itself takes in a searchValue parameter, which is a string value that represents the search term entered by the user. In this implementation, the function logs the searchValue parameter to the console. However, in a real-world scenario, this function could be used to perform a search operation on a data set or to filter a list of items based on the search term.
  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  // The handleDelete function is used to delete rows of data from the server. It receives an array of rows to delete as an argument, sends a DELETE request to the server with the IDs of the rows to delete, and then calls the getData function to update the table with the new data. It also includes an error handling block in case the server returns an error.
  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`http://127.0.0.1:8000/api/project/${rowsDeleted}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //The getData function retrieves project data from a server using an HTTP GET request with the axios library. It sets the Loading state variable to true initially, sends an authorization token along with the request headers, and then updates the Data state variable with the response data from the server.
  // If the request is successful, the setData function is called to set the data in the state and setLoading is called with false to indicate that the data has been loaded. If the request fails, setLoading is called with false to indicate that the data failed to load.
  const getData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:8000/api/project", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log(Data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  // This code is a function called handleUpdate that takes in a rowData parameter. It sets the state variable editingRow to true, then makes an HTTP PATCH request to update a row in a database. The request URL is constructed using the rowData[0] value as the ID of the row to update. The request body includes the name and is_active fields from the rowData array. The request includes an authorization header containing a bearer token. If the request is successful, the getData function is called to update the table with the new data, and the rowData array is logged to the console. If the request fails, the error is logged to the console.
  const handleUpdate = (rowData) => {
    setEditingRow(true);
    const token = Cookies.get("token");
    console.log("console[rowdata]", rowData);
    axios
      .patch(
        `http://127.0.0.1:8000/api/project/${rowData[0]}`,
        {
          name: rowData[1],
          about: rowData[2],
          status: rowData[3],
          team_id: rowData[4],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getData();
        console.log(rowData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This code defines an array of objects representing the columns of a table. Each object contains a name property that defines the name of the column, a label property that defines the header of the column, and an options property that contains options for the column.
  // For columns that are editable (name, about, status, and team_id), the customBodyRender option defines a function that returns the appropriate content for the cell. The function checks if the current row is being edited, and if it is, renders an input field with the current value of the cell. Otherwise, it simply renders the value of the cell.
  // For the actions column, the customBodyRender option defines a function that returns two buttons for editing and deleting the current row. When the edit button is clicked, the handleUpdate function is called with the current row data as an argument. When the delete button is clicked, the handleDelete function is called with the ID of the current row as an argument.
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => updateValue(e.target.value)}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "about",
      label: "About",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => updateValue(e.target.value)}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => updateValue(e.target.value)}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "team_id",
      label: "TEAM ID",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
              onClick={() => setEditingRow(rowIndex)}
            >
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => updateValue(e.target.value)}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "created_at",
      label: "Created At",
    },
    {
      name: "updated_at",
      label: "Updated At",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          return (
            <>
              <button
                className="edit-btn"
                onClick={() => handleUpdate(rowData)}
              >
                <MdOutlineEdit />
              </button>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <button
                className="delete-btn"
                onClick={() => {
                  setDeleteId(rowData[0]);
                  showConfirmationBox();
                }}
              >
                <MdDeleteForever />
              </button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "vertical",
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for Project",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5, 10, 20],
    onCellClick: (cellData, cellMeta) => {
      const rowIndex = cellMeta.rowIndex;
      if (cellMeta.colIndex === 3) {
        setEditingRow(rowIndex);
      }
    },
    onRowsDelete: handleDelete,
    fullScreen: true,
  };

  // This code is a React component that renders a table of administrators using the MUI Data Table library.
  // The component conditionally renders either a loading spinner or the table of administrators depending on whether the Loading state variable is true or false.
  // The table is configured with various options, such as pagination, searching, filtering, and the ability to download and print the table. The columns are defined with custom body render functions for certain columns to allow editing of data.
  // Additionally, the component renders an ProjectPopup component.
  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          {console.log(adminSuper)}
          {<button onClick={openProjectPopup}>Add Project +</button>}
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={"Projects"}
              data={rows}
              columns={columns}
              options={options}
              sx={{
                width: "70%",
                marginLeft: "390px",
                marginY: "190px",
                zIndex: 1,
                textAlign: "center",
              }}
            />
            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
            <ProjectPopup />
          </Box>
        </div>
      )}
    </>
  );
}

export default Project;
