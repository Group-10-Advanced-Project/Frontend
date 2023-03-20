import "./header.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";

function Header(props) {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/auth/admin/1",
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAdminName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="header">
      <div className="admin-info">
        <CgProfile size={42} /> <span>{adminName}</span>
      </div>
    </div>
  );
}

export default Header;
