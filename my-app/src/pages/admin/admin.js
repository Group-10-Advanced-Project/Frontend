import "./admin.css";
import Header from "../../components/header";

function Admin (props){
    return(
        <div>
            <h1>
                Admin
            </h1>
            <Header dataType="admins" />
        </div>
    );
}
export default Admin;