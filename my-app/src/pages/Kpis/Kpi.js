import "./Kpi.css";
import React, { useState, useEffect } from "react";
import AdminPopup from "../../components/addAdminPopup/adminPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import Loader from "../../components/loader/loader";
import Cookies from "js-cookie";

function createData(
  id,
  name,
  about,
  created_at,
  updated_at
) {
  return {
    id,
    name,
    about,
    created_at,
    updated_at,
  };
}

function Kpi(props) {
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
        item.name,
        item.about,
        item.created_at,
        item.updated_at
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://127.0.0.1:8000/api/deletekpi/${rowsDeleted}`, {
        // token issue should be fixed after discussing others work
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const token = Cookies.get("token");
    axios.get("http://127.0.0.1:8000/api/getAllkpi", {
        //token issue should be fixed after discussing others work
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    const token = Cookies.get("token");
    axios
      .patch(
        `http://127.0.0.1:8000/api/auth/editKpi/${rowData[0]}`,
        {
          name: rowData[1],
          about: rowData[2],
          
        },
        {
          // token issue should be fixed after discussing others work
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getData();
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
    searchPlaceholder: "Search for Kpi",
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
            title={"Kpis"}
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
export default Kpi;