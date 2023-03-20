import React from "react";
import { ToastContainer } from "react-toastify";
import "./EditConformation.css";

export default function ConfirmationPopup(props) {
  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="edit-popup" id="modal">
      <p>Are you sure that you want to edit this?</p>
      <div>
        <button
          id="confirmation-delete-btn"
          onClick={() => {
            props.handleDelete(props.id);
            closePopup();
          }}
        >
          Delete
        </button>
        <button onClick={closePopup}>Cancel</button>
      </div>
      <ToastContainer />
    </dialog>
  );
}
