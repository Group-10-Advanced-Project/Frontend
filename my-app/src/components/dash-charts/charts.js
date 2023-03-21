import "./charts.css";
import { FaFolder } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import PieGraph from "./pie";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useEffect } from "react";

function Charts(props) {
  const [DataPro, setData] = useState([]);
  useEffect(()=>{
    getDataProject();
  }, []);
  const getDataProject=()=>{
    const token = Cookies.get("token");
    axios.get("http://127.0.0.1:8000/api/project", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [DataEmp, setdata] = useState([]);
  useEffect(()=>{
    getDataEmp();
  }, []);
  const getDataEmp=()=>{
    const token = Cookies.get("token");
    axios.get("http://127.0.0.1:8000/api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        
      })
      .then((response) => {
        setdata(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [DataAd, setdataa] = useState([]);
  useEffect(()=>{
    getDataEmp();
  }, []);
  const getDataAdmin=()=>{
    const token = Cookies.get("token");
    axios.get("http://127.0.0.1:8000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        
      })
      .then((response) => {
        setdata(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // const getDataEmployee=()=>{
  //   const token = Cookies.get("token");
  //   axios.get("http://127.0.0.1:8000/api/employee", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //       },
        
  //     })
  //     .then((response) => {
  //       setData(response.data.data);
  
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="home-container">
        <div className="box">
          <div className="box-icon">
            <FaFolder />
          </div>
          <div className="box-data">
            <span>Projects</span>
            <h1>{DataPro.length}</h1>
          </div>
        </div>

        <div className="box">
          <div className="box-icon">
            <HiUsers />
          </div>
          <div className="box-data">
            <span>Employees</span>
            <h1>{DataEmp.length}</h1>
          </div>
        </div>

        <div className="box">
          <div className="box-icon">
            <MdSecurity />
          </div>
          <div className="box-data">
            <span>Admins</span>
            <h1>+26</h1>
          </div>
        </div>
      </div>

      <div className="home-container-2">
        <div className="card">
          <div style={{ width:"70%", height: "10% ", marginBottom:"30%"}}>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>KPI</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Revenue</TableCell>
                  <TableCell>$1,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profit</TableCell>
                  <TableCell>$500,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profit</TableCell>
                  <TableCell>$500,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profit</TableCell>
                  <TableCell>$500,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profit</TableCell>
                  <TableCell>$500,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion Rate</TableCell>
                  <TableCell>10%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
            {/* <CircularProgressbar
              value={75}
              circleRatio={0.75}
              maxValue={100}
              text={`75%`}
              styles={{
                trail: {
                  transform: "rotate(-135deg)",
                  transformOrigin: "center center",
                  strokeWidth: 3,
                },

                path: {
                  transform: "rotate(-135deg)",
                  transformOrigin: "center center",
                  stroke: "#34ccfc",
                  strokeWidth: 4.5,
                },
              }}
            />

            <h1>Progress</h1> */}
          </div>
        </div>
         <div className="card">
          <PieGraph />
        </div> 
      </div>
    </div>
  );
}

export default Charts;
