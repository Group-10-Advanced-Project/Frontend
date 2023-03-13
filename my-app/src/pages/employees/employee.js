import "./employee.css";
import React from "react";
import EmployeePopup from "../../components/addEmployeePopup/employeePopup";

function Employee(props) {
  function openPopup() {
    document.querySelector(".employee-popup").showModal();
  }
  return (
    <div>
      <h1>Employee</h1>
      <button onClick={openPopup}>Add Employee +</button>
      <EmployeePopup />
    </div>
  );
}

export default Employee;
