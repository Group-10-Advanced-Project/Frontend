import "./header.css";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";

function Header(props) {
  const [adminName, setAdminName] = useState("");
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/auth/admin/1", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setAdminName(response.data.message.first_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (useLocation().pathname == "/login") return null;
  return (
    <div className="header">
      <div className="admin-info">
        <CgProfile size={42} /> <span>{adminName}</span>
      </div>
    </div>
  );
}

export default Header;
