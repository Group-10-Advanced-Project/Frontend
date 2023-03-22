import React, { useState } from "react";
import "./adminPopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";

export default function AdminPopup(props) {
  const [first_name, setFirsName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superAdmin, setSuperAdmin] = useState(0);
  console.log(superAdmin);
  const addAdmin = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/addadmin",
        {
          first_name,
          last_name,
          email,
          password,
          superAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Admin was added");
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
    document.querySelector(".admin-popup").close();
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
      <ToastContainer autoClose={1000} />
    </dialog>
  );
}
