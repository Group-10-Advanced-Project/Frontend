import "./employee.css";

import React from "react";

import DataGridDemo from "./employeeTable.js";


function Employee(props) {
  return (
    <div className="main center">
      <h1 className="employeeTitle">Employee</h1>
   
      <div className="employeeTable">
        <DataGridDemo></DataGridDemo>
      </div>
    
    </div>
  );
}
export default Employee;
