import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/admin.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Employee from "./pages/employees/employee.js";
import Login from "./pages/login/login.js";
import Teams from "./pages/teams&projects/teams-projects.js";
import NewAdmin from "./pages/admin/create-admin.js";
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth.js';
import Unauthorized from './components/Unauthorized';

const ROLES={
  'SuperAdmin':1,
  'Admin':0,
}
function App() {
  return (
      <Routes>
      <Route path="/" element={<Layout/>}>
        {/*Public Routes*/}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized/> } />
        </Route> 
{/*Protected Routes*/}
<Route element={<RequireAuth  allowedRoles={[ROLES.Admin]}/>} >
                  <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="admin" element={<Admin/>}/>
                <Route path="employee" element={<Employee/>}/>
                <Route path="team&projects" element={<Teams/>}/>
             
              </Route>
              <Route element={<RequireAuth  allowedRoles={[ROLES.SuperAdmin]}/>} >
              <Route path="newAdmin" element={<NewAdmin/>}/>
              </Route>

      </Routes>
   
  );
}

export default App;
