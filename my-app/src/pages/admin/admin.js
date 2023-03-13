import "./admin.css";
import React from "react";
import AdminPopup from "../../components/addAdminPopup/adminPopup";

function Admin(props) {
  function openPopup() {
    document.querySelector("#modal").showModal();
  }
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={openPopup}>Add Admin +</button>
      <AdminPopup></AdminPopup>
    </div>
  );
}
export default Admin;
