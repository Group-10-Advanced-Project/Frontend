import React, { useState } from "react";
import "./teampopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";

export default function TeamPopup(props) {
  const [name, setName] = useState("");

  const addTeam = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/team",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      toast.success("Team was added");
      setTimeout(() => {
        toast.dismiss();
        closePopup();
        props.getData();
      }, 2000);
    } catch (error) {
      toast.error("Values entered are invalid");
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  function closePopup() {
    document.querySelector(".team-popup").close();
  }

  return (
    <dialog className="team-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POSTToastContainer" method="dialog">
        <fieldset>
          <label>Team Name</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset></fieldset>
        <fieldset>
          <button onClick={addTeam}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
