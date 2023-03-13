import React, {useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
const Card = ({
  picture,
  key,
  employee_id,
  email,
  first_name,
  last_name,
  team_id,
  phone_number,
  onDelete

}) => {
  const notify = () => toast("Employee deleted sucseffuly !");
  const [triggered, setTriggered] = useState(false);
  const [detailActive, setDetailActive] = useState(false);
  const handleDelete = () => {
    notify(); // call the notify function to show the notification
    onDelete(employee_id); // call the onDelete function to delete the employee
  };
  return (
    <main key={key} className="box center">
      <section className="employee_container">
        <img
          className="img-employee"
          src={`http://localhost:8000${picture}`}
          alt=""
        />
        <p className="employee_name">
          {first_name} {last_name}
        </p>

        <div className="email-employee">
          {" "}
          <AiIcons.AiTwotoneMail className="icon" />
          {email}
        </div>
        <div
          className="arr_container center"
          onClick={() => setTriggered(!triggered)}
        >
          <FaIcons.FaArrowRight className="click" />
        </div>
        {/* <div className="delete center" onClick={handleDelete}>
          <FaIcons.FaTrashAlt />
        </div> */}
        <div className="add center">
        <FaIcons.FaEdit />
        </div>
      </section>

      <section
        className={triggered ? "left-container active" : "left-container off"}
      >
        <div className="edit center">
        <HiIcons.HiInformationCircle />
          
        </div>
        <div className="info">
        <FaIcons.FaEdit />
        </div>
        <div className="information">
          
          <p>
            <AiIcons.AiFillPhone className="icon" />
            {phone_number}
          </p>
          <p>
            <FaIcons.FaIdCard className="icon" />
            {employee_id}
          </p>
          <p>
            {" "}
            <AiIcons.AiOutlineTeam className="icon" />
            {team_id}
          </p>
          <p>
            <FaIcons.FaProjectDiagram className="icon" />
            erp
          </p>
          <p>
            {" "}
            <AiIcons.AiOutlineBarChart className="icon" />
            10/10
          </p>
        </div>
        {/* below to edit */}
        <div
          className="cancel center"
          onClick={() => {
            setTriggered(!triggered);
          }}
        >
          <FaIcons.FaTimes className="click" />
        </div>
      </section>
      {/* warning delete section */}
      <section className={detailActive ? "delete-container yes" : "delete-container no"}>
        <div className="delete center" >
          <FaIcons.FaTrashAlt onClick={() => setDetailActive(true)}/>
        </div>
        <div className="sure">
          <p>
            <AiIcons.AiFillWarning />
          </p>
          <div>
          <button className="question"onClick={handleDelete}  >Are you sure to delete it ! </button>
          <button className="question" onClick={() => setDetailActive(false)}>I don't Want to delete it !  </button>
      
          </div>
        </div>
      </section>
    </main>
  );
};
export default Card;
