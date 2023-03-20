import "./sideNav.css";

import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { MdOutlineClass } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { GoProject } from "react-icons/go";
import { TbReportSearch } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

import logo from "../../erp.png";
function SideNav(props) {
  if (useLocation().pathname === "/login") return null;
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
          <NavLink to={"/team"}>
            <RiTeamLine className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Teams</span>
          </NavLink>
          <NavLink to={"/project"}>
            <GoProject className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>Projects</span>
          </NavLink>
          <NavLink to={"/kpi"}>
            <MdOutlineClass className={"icons"} size={25} />
            <b></b>
            <u></u>
            <span>KPIS</span>
          </NavLink>
          <NavLink to={"/reports"}>
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

export default SideNav;
