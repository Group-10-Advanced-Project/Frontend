import { Route, Routes } from "react-router-dom";
import Admin from "../../pages/admin";
import Dashboard from "../../pages/dashboard";
import Employee from "../../pages/employees";
import Login from "../../pages/login";
import Teams from "../../pages/teams&projects";

function AllRoutes (){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/employee" element={<Employee/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/team&projects" element={<Teams/>}/>
             </Routes> 
        </div>
    )
}

export default AllRoutes;