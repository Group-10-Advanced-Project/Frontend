import "./employee.css";
import React from "react";
import Header from "../../components/header";

function Employee (props){
    return (
        <div>
            <h1>Employee</h1>
            <Header dataType="employees" />
        </div>
    )
}

export default Employee;
