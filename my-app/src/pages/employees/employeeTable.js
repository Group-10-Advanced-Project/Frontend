import React, { useState, useEffect } from "react";
// import AdminPopup from "../../components/addAdminPopup/adminPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
// import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./employee.css";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function createData(
  employee_id,
  first_name,
  last_name,
  email,
  phone_number,
  picture,
  team_id,
  team_name 
) {
  return {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    picture,
    team_id,
 
  };
}

function Employee(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState();

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.employee_id,
        item.first_name,
        item.last_name,
        item.email,
        item.phone_number,
        item.picture,
        item.team_id,
     
       
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = async (employee_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/employee/${employee_id}`);
      setTimeout(() => window.location.reload(true), 2000);
      toast.success("Employee deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete employee!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  };

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/employee", {})
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data)
        setLoading(false);
       
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (employee_id, first_name,last_name,email,picture,team_id, phone_number) => {
    setEditingRow(true);

    axios
      .patch(`http://127.0.0.1:8000/api/employee/${employee_id}`, {
        
        first_name,
        last_name,
        email,
        phone_number,
        picture,
        team_id,
      })
      .then((response) => {
        getData();
        toast.success("Employee updated successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update employee!", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
        });
      });
  };

  const columns = [
    {
      name: "employee_id",
      label: "ID",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ textAlign: "center" }}
             
            >
              
                {value}
              
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "picture",
      label: "Picture",
    
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
            style={{ textAlign: "center" }}
             onClick={() => setEditingRow(rowIndex)}>
              
              {isEditing ? (
                <input
                  type="file"
                  className="EditInput"
                  // value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                <img
                src={`http://localhost:8000${value}`}
                alt="Employee"
                style={{ width: 45, height: 45, borderRadius: "75%" }}
              />
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "first_name",
      label: "First Name",
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
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
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
      name: "last_name",
      label: "Last Name",
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
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
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
      name: "email",
      label: "Email",
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
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
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
      name: "phone_number",
      label: "Phone_number",
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
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
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
      label: "Team ID",
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
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
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
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          return (
            <>
              <AppRegistrationSharpIcon
                onClick={() => handleUpdate(id)}
                sx={{
                  color: "#5cbdcb",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
              />
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <DeleteRoundedIcon
                sx={{
                  color: "#5cbdcb",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
                onClick={() => handleDelete(id)}
              />
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
    searchPlaceholder: "Search for Employee",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 10,
    loaded: true,
    // rowsPerPageOptions: [5, 10, 20],
    onCellClick: (cellData, cellMeta) => {
      const rowIndex = cellMeta.rowIndex;
      if (cellMeta.colIndex === 3) {
        setEditingRow(rowIndex);
      }
    },
    onRowsDelete: handleDelete,
    fullScreen: true,
  };
  return (
    <Box sx={{ Width: "650", height: "" }}>
      <ToastContainer />
      <MUIDataTable
        title={"Employee"}
        data={rows}
        columns={columns}
        options={options}
        sx={{
          width: "70%",
          marginLeft: "390px",
          marginY: "190px",
          zIndex: 1,
          textAlign: "center",
          backgroundColor: "#5cbdcb",
        }}
      />
    </Box>
  );
}
export default Employee;
