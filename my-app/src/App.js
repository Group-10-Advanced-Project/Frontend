import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Admin from "./pages/admin/admin.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Employee from "./pages/employees/employee.js";
import Login from "./pages/login/login.js";
import Teams from "./pages/teams&projects/teams-projects.js";
import NewAdmin from "./pages/admin/create-admin.js";
import SideNav from "./components/sideNav/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/login" element={<Login />} />
          <Route path="/team&projects" element={<Teams />} />
          <Route path="/newAdmin" element={<NewAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
