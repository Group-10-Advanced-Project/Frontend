import "./employee.css";

import React from "react";
import EmployeePopup from "../../components/addEmployeePopup/employeePopup";

import DataGridDemo from "./employeeTable.js";


function Employee(props) {
  function openPopup() {
    document.querySelector(".employee-popup").showModal();
  }
  return (

  
      

    <div className="main center">
      <h1 className="employeeTitle">Employee</h1>
   
      <div className="employeeTable">
        <DataGridDemo></DataGridDemo>
        <button onClick={openPopup}>Add Employee +</button>
      <EmployeePopup />
      </div>
    

    </div>
  );
}
export default Employee;
