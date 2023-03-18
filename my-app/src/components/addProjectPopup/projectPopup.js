import React, { useState } from "react";
import "./projectPopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function ProjectPopup() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");
  const [team_id, setTeam_id] = useState("");

  const addProject = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/addproject",
        {
          name,
          about,
          status,
          team_id,
        },
        {
          // token issue should be fixed after discussing others work
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Nzg2NTAzNTIsImV4cCI6MTY3ODY1Mzk1MiwibmJmIjoxNjc4NjUwMzUyLCJqdGkiOiJhNDhMSGlIbE1qR2hOUDMxIiwic3ViIjoiNSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkifQ.9vHnV3_QbQmGKMbn5XJcWjiEpeSh6fBirrdIzaNWDnc`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Project was added");
      setTimeout(() => window.location.reload(true), 1000);
    } catch (error) {
      toast.error("Values entered are invalid");
    }
  };

  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="project-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POSTToastContainer" method="dialog">
        <fieldset>
          <label>Name</label>
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
          <label>team_id</label>
          <input
            type="team_id"
            required
            onChange={(e) => setTeam_id(e.target.value)}
          />
        </fieldset>
        <fieldset></fieldset>
        <fieldset>
          <button onClick={addProject}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
