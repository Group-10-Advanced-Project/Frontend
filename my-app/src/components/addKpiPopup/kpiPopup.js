import React, { useState } from "react";
import "./KpiPopup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";

export default function KpiPopup(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const addKpi = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/kpi",
        {
          name,
          about,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Kpi was added");
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
    document.querySelector(".kpi-popup").close();
  }

  return (
    <dialog className="kpi-popup" id="modal">
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

        <fieldset></fieldset>
        <fieldset>
          <button onClick={addKpi}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
