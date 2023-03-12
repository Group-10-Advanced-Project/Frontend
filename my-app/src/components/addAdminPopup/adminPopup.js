import React from "react";
import "./adminPopup.css";
import { AiOutlineClose } from "react-icons/ai";

export default function AdminPopup() {
  function closePopup() {
    document.querySelector("#modal").close();
  }
  return (
    <dialog className="admin-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POST" method="dialog">
        <fieldset>
          <label>First Name</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Last Name</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <input type="email" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" />
        </fieldset>
        <fieldset>
          <label>Super Admin</label>
          <input type="number" />
        </fieldset>
        <fieldset></fieldset>
        <fieldset>
          <button>Submit</button>
        </fieldset>
      </form>
    </dialog>
  );
}
