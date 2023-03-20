import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/admin.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Employee from "./pages/employees/employee.js";
import Login from "./pages/login/login.js";
import Teams from "./pages/teams/teams.js";
import Projects from "./pages/projects/projects.js";
import NewAdmin from "./pages/admin/create-admin.js";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth.js";
import Header from "./components/header";
// import Unauthorized from './components/Unauthorized';

// const ROLES={
//   'SuperAdmin':1,
//   'Admin':0,
// }
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public Routes*/}
        <Route path="login" element={<Login />} />
        {/* <Route path="unauthorized" element={<Unauthorized/> } /> */}
      </Route>
      {/*Protected Routes*/}
      {/* <Route element={<RequireAuth  allowedRoles={[ROLES.Admin]}/>} > */}
      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="employee" element={<Employee />} />
        <Route path="team" element={<Teams />} />
        <Route path="project" element={<Projects />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="newAdmin" element={<NewAdmin />} />
      </Route>
    </Routes>
    <Header />
    </>
  );
}

export default App;
