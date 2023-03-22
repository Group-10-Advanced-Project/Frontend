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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [DataAd, setdataa] = useState([]);
  useEffect(()=>{
    getDataAdmin();
  }, []);
  const getDataAdmin = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:8000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setdataa(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const [DataKp, setDataKp] = useState([]);
  useEffect(()=>{
    getDataKpi();
  }, []);
  const getDataKpi=()=>{
    const token = Cookies.get("token");
    axios.get("http://127.0.0.1:8000/api/getAllkpi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        
      })
      .then((response) => {
        setDataKp(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

 
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
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
            <h1>{DataAd.length}</h1>
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

              {DataKp.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.about}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
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
