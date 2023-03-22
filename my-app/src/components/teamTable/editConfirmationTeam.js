import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./EditTeamConformation.css";

export default function EditTeamConfirmationPopup(props) {
  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    
    <dialog className="edit-popup" id="modal">
      <p>Are you sure that you want to edit this?</p>
      <div>
        <button
          id="confirmation-edit-btn"
          onClick={() => {
            props.handleUpdate(props.id);
            closePopup();

          }}
        >
          Edit
        </button>
        <button onClick={closePopup}>Cancel</button>
      </div>
      <ToastContainer />
    </dialog>
   

  );
}