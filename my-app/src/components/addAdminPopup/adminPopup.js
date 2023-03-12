import React, { useState } from "react";
import "./adminPopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function AdminPopup() {
  const [first_name, setFirsName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superAdmin, setSuperAdmin] = useState(0);

  const addAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/addadmin",
        {
          first_name,
          last_name,
          email,
          password,
          superAdmin,
        },
        {
          // token issue should be fixed after discussing others work
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Nzg2NTAzNTIsImV4cCI6MTY3ODY1Mzk1MiwibmJmIjoxNjc4NjUwMzUyLCJqdGkiOiJhNDhMSGlIbE1qR2hOUDMxIiwic3ViIjoiNSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkifQ.9vHnV3_QbQmGKMbn5XJcWjiEpeSh6fBirrdIzaNWDnc`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Admin was added");
      setTimeout(() => window.location.reload(true), 1000);
    } catch (error) {
      toast.error("Values entered are invalid");
    }
  };

  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="admin-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POSTToastContainer" method="dialog">
        <fieldset>
          <label>First Name</label>
          <input
            type="text"
            required
            onChange={(e) => setFirsName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Last Name</label>
          <input
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Super Admin</label>
          <input
            type="number"
            min={0}
            max={1}
            required
            onChange={(e) => setSuperAdmin(e.target.value)}
          />
        </fieldset>
        <fieldset></fieldset>
        <fieldset>
          <button onClick={addAdmin}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
