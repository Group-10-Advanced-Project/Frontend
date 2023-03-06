import { Route, Routes } from "react-router-dom";
import Admin from "../../pages/admin";
import Dashboard from "../../pages/dashboard/dashboard.js";
import Employee from "../../pages/employees/employee.js";
import Login from "../../pages/login/login.js";
import Teams from "../../pages/teams&projects/teams-projects.js";
import NewAdmin from "../../pages/admin/create-admin.js";

function AllRoutes (){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/employee" element={<Employee/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/team&projects" element={<Teams/>}/>
                <Route path="/newAdmin" element={<NewAdmin/>}/>
             </Routes> 
        </div>
    )
}

export default AllRoutes;