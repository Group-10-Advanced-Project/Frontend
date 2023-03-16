import "./admin.css";
import React, { useState, useEffect } from "react";
import AdminPopup from "../../components/addAdminPopup/adminPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import Loader from "../../components/loader/loader";

function createData(
  id,
  first_name,
  last_name,
  email,
  is_super_admin,
  created_at,
  updated_at
) {
  return {
    id,
    first_name,
    last_name,
    email,
    is_super_admin,
    created_at,
    updated_at,
  };
}

function Admin(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  function openPopup() {
    document.querySelector("#modal").showModal();
  }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.first_name,
        item.last_name,
        item.email,
        item.is_super_admin,
        item.created_at,
        item.updated_at
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`http://127.0.0.1:8000/api/admin/${rowsDeleted}`, {
        // token issue should be fixed after discussing others work
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjc4ODI2MjIxLCJleHAiOjE2Nzg4Mjk4MjEsIm5iZiI6MTY3ODgyNjIyMSwianRpIjoibWhXY01xTmZoYkEwanE5diIsInN1YiI6IjUiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.uPK7uZAQygulnDqtYqfnJTGLc8uMrkCQu7qs0tIAglE`,
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

  const getData = () =>
    axios
      .get("http://127.0.0.1:8000/api/admin", {
        // token issue should be fixed after discussing others work
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Nzg5NjExNDEsImV4cCI6MTY3ODk2NDc0MSwibmJmIjoxNjc4OTYxMTQxLCJqdGkiOiJXRDd6akt6NE9TYWJhandFIiwic3ViIjoiMSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkifQ.jg94HDyCnFMTp0r6eLyjMR9xvCioMpjm5lE-HkxITR4`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.message);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    console.log("console[rowdata]", rowData);
    axios
      .patch(
        `http://127.0.0.1:8000/api/admin/${rowData[0]}`,
        {
          name: rowData[1],
          is_active: rowData[2],
        },
        {
          // token issue should be fixed after discussing others work
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjc4ODI2MjIxLCJleHAiOjE2Nzg4Mjk4MjEsIm5iZiI6MTY3ODgyNjIyMSwianRpIjoibWhXY01xTmZoYkEwanE5diIsInN1YiI6IjUiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.uPK7uZAQygulnDqtYqfnJTGLc8uMrkCQu7qs0tIAglE`,
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

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
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
      name: "is_super_admin",
      label: "SUPER ADMIN",
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
                onClick={() => handleDelete(rowData[0])}
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
    searchPlaceholder: "Search for Admin",
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
  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Box sx={{ maxWidth: "75%", margin: "auto" }}>
          <MUIDataTable
            title={"Admins"}
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
          <AdminPopup />
        </Box>
      )}
    </>
  );
}
export default Admin;
