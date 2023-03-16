import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function ConfirmationPopup(props) {
  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="confirmation-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <div></div>
      <ToastContainer />
    </dialog>
  );
}
