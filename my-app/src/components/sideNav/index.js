import "./sideNav.css";

import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { MdOutlineClass } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { FaUserCheck, FaUserTie } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

import logo from "../../erp.png";
function sideNav(props) {
  if (useLocation().pathname == "/login") return null;
  return (
    <>
      <nav>
        <div>
          <img className={"logo"} src={logo} alt="SVG Logo" />
        </div>

        <div className={"bar"}>
          <NavLink to={"/"}>
            <RxDashboard className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={"/admin"}>
            <MdOutlineClass className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Admin</span>
          </NavLink>
          <NavLink to={"/employee"}>
            <BsPersonVcard className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Employees</span>
          </NavLink>
          <NavLink to={"/team&projects"}>
            <RiTeamLine className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Team&Projects</span>
          </NavLink>
          <NavLink to={"/attendance"}>
            <MdOutlineClass className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>KPIS</span>
          </NavLink>
          <NavLink to={"/admin"}>
            <TbReportSearch className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Reports</span>
          </NavLink>
        </div>

        <div className={"setting"}>
          <NavLink to={"/login"}>
            <BiLogOut className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default sideNav;
