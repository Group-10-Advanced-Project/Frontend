import "./Kpi.css";
import React, { useState, useEffect } from "react";
import KpiPopup from "../../components/addKpiPopup/kpiPopup.js";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import showEditBox from "../../components/EditConformation/EditConformation.js"
import axios from "axios";
import MUIDataTable from "mui-datatables";
import  debounce from "lodash/debounce";
import { Box } from "@mui/system";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import Loader from "../../components/loader/loader";
import Cookies from "js-cookie";
import { AiOutlineSave ,AiOutlinePlus} from "react-icons/ai";


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
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  function openKpiPopup() {
    document.querySelector(".kpi-popup").showModal();
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
        `http://127.0.0.1:8000/api/editKpi/${rowData[0]}`,
        {
          name: rowData[1],
          about: rowData[2],
          
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };

  const showEditBox = () => {
    document.querySelector(".edit-popup").showModal();
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
              // onClick={() => setEditingRow(rowIndex)}
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
              // onClick={() => setEditingRow(rowIndex)}
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
              {isEditing && editingRow === tableMeta.rowIndex ? (
                <button
                  className="save-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRow(null);
                    handleUpdate(rowData);
                    showEditBox();
                  }}
                >
             <AiOutlineSave />
                </button>
              ) : (
                <button
                  className="edit-btn" 
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRow(tableMeta.rowIndex);
                  }}
                >
                  <MdOutlineEdit />
                </button>
              )}
        


              
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
    responsive: "simple",
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
      
        <div>

        
        <Box sx={{ maxWidth: "75%", margin: "auto" }}>
          <MUIDataTable
    title={<div><button className='addkpi' onClick={openKpiPopup}><AiOutlinePlus/></button> <span className="kpititle">Kpis</span></div>}
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
          <showEditBox handleUpdate={handleUpdate}  id={editingRow}/>
          <KpiPopup />
        </Box>
      </div>
      )}
    </>
  );
}
export default Kpi;