import React from "react";
import { Button } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// import DeleteTeam from "../delete_team/delete_team";
// import EditTeam from "../edit_Form/EditTeam";
import { useEffect, useState } from "react";
// import FormTeam from "./form-team";
import axios from "axios";
import Loader from "../loader/loader";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
// import "./teamRow.css";

function ListTeam(){

  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
   
  useEffect(()=>{
    setLoading(true);
    getData();
  }, [])

  const getData = () =>
    axios
      .get("http://127.0.0.1:8000/api/team", {
        // token issue should be fixed after discussing others work
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDIvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Nzg5NTg4ODYsImV4cCI6MTY3ODk2MjQ4NiwibmJmIjoxNjc4OTU4ODg2LCJqdGkiOiIxREJ6Vk9ZTTVFQzFGWTlSIiwic3ViIjoiMSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkifQ.DMpMzRzJqNpVz4GBDH2Oi3uB4LFSP4eeSjVqqZwp_SA`,
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

    const columns = [
    {field:"id"},
    { field: "name", headerName: "name", width: 270 },
    { field: "numOfTeam", headerName: "Team Number", width: 180 },
    { field: "numProject", headerName: "Project Number", width: 180 },
    {
    field: "showTeam",
    headerName: "Show Team",
    width: 160,
    renderCell: () => (
    <Button
    name="show team"
    variant="contained"
    sx={{
    margin: "1.2pc",
    padding: "0.5pc 1.5pc",
    "&:hover": {
    backgroundColor: "#4dedf5",
    color: "#16202a",
    },
    }}
    >
    {<GroupsIcon />}
    </Button>
    ),
    },
    {
    field: "edit",
    headerName: "Edit",
    width: 150,
    // renderCell: () => <EditTeam />,
    },
    {
    field: "delete",
    headerName: "Delete",
    width: 150,
    // renderCell: () => <DeleteTeam />,
    },
    ];
    
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
            data={Data}
            columns={columns}
            // options={options}
            sx={{
              width: "70%",
              marginLeft: "390px",
              marginY: "190px",
              zIndex: 1,
              textAlign: "center",
            }}
          />
        </Box>
      )}
    </>
    );
    
    }
    
    export default ListTeam;