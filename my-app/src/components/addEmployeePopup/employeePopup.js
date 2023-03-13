import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function EmployeePopup() {
  const [employee_id, setEmployeeId] = useState(null);
  const [first_name, setFirsName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState(null);
  const [picture, setPicture] = useState(null);
  const [team_id, setTeamId] = useState(null);

  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employee",
        {
          employee_id,
          first_name,
          last_name,
          email,
          phone_number,
          picture,
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

      toast.success("Employee was added successfully");
      setTimeout(() => window.location.reload(true), 1000);
    } catch (error) {
      toast.error("Values entered are invalid");
    }
  };

  function closePopup() {
    document.querySelector("#modal").close();
  }

  return (
    <dialog className="employee-popup" id="modal">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <form action="POSTToastContainer" method="dialog">
        <fieldset>
          <label>Employee ID</label>
          <input
            type="text"
            min={0}
            required
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </fieldset>
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
          <label>Phone Number</label>
          <input
            type="text"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Picture</label>
          <input
            type="file"
            required
            onChange={(e) => setPicture(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Team ID</label>
          <input
            type="text"
            min={0}
            required
            onChange={(e) => setTeamId(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <button onClick={addEmployee}>Submit</button>
        </fieldset>
      </form>
      <ToastContainer />
    </dialog>
  );
}
