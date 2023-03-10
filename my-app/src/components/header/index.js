import "./header.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  if (useLocation().pathname == "/login") {
    return null;
  }1
  return (
    <div className="header">
      <form className="search-form">
        <fieldset className="search-fieldset">
          <input
            type="text"
            name=""
            placeholder="Search"
            onChange={handleChange}
            value={searchInput}
            className="search-bar"
          />
          <button className="search-btn" type="submit">
            <AiOutlineSearch />
          </button>
        </fieldset>
      </form>
      <p className="admin-name">Admin</p>
    </div>
  );
};

export default Header;
