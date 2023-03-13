import "./employee.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./Card";
// import photo from "./ahmad.jpeg";

function Employee(props) {
  
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/employee")
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employees]);
  const handleDelete = (employee_id) => {
    axios
      .delete(`http://localhost:8000/api/employee/${employee_id}`)
      .then(() => {
        
        // const updatedEmployees = employees.filter((employee) => employee.employee_id !== employee_id);
        // setEmployees(updatedEmployees);
      window.location.reload(true)
      })
      .catch((err) => {
        console.log(err);
        
      });
  };
  return !employees ? (
    <h1>no employee</h1>
  ) : (
    <div className="main center">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          picture={employee.picture}
          employee_id={employee.employee_id}
          email={employee.email}
          first_name={employee.first_name}
          last_name={employee.last_name}
          team_id={employee.team_id}
          phone_number={employee.phone_number}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
  

}
export default Employee;


