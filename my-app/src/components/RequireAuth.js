import { useLocation ,Navigate,Outlet  } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";

const RequireAuth=()=>{
    const {auth}=useAuth();
    const location =useLocation();

    return(
        auth?.access_token
            ?<Outlet /> 
           : <Navigate to="/login" state={{ from: location }} replace />

        //    auth?.is_super_admin?.find(is_super_admin=>allowedRoles?.includes(is_super_admin))
        //    ?<Outlet /> 
        //    :auth?.access_token
        //   ?<Navigate to='/unauthorized' state={{ from: location }} replace />
        //   : <Navigate to="/login" state={{ from: location }} replace />
           
    );

}

export default RequireAuth;