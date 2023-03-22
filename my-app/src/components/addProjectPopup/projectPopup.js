import React, { useState } from "react";
import "./projectPopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";

export default function ProjectPopup() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");
  const [team_id, setTeam_id] = useState("");

  const addProject = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/project",
        {
          name,
          about,
          status,
          team_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Project was added");
      setTimeout((e) => {
        toast.dismiss();
        closePopup();
      }, 2000);
    } catch (error) {
      toast.error("Values entered are invalid");
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  function closePopup() {
    document.querySelector(".project-popup").close();
  }

  return (
    <dialog className="project-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POSTToastContainer" method="dialog">
        <fieldset>
          <label>Project Name</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>About</label>
          <input
            type="text"
            required
            onChange={(e) => setAbout(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Status</label>
          <input
            type="text"
            required
            onChange={(e) => setStatus(e.target.value)}
          />
        </fieldset>
        <fieldset>
          {/* Not sure if team_id is a fillable or not  */}
          <label>team_id</label>
          <input
            type="team_id"
            required
            onChange={(e) => setTeam_id(e.target.value)}
          />
        </fieldset>
        {/* what's the importance of this fieldset element */}
        <fieldset></fieldset>
        <fieldset>
          <button onClick={addProject}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
