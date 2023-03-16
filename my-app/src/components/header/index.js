import "./header.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";

/*This code exports a React component called Header. The component renders a header section that contains a search bar and the name of the admin.
it provides a simple search bar that allows users to enter a search query and updates the searchInput state whenever the value of the input changes.*/
const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  //if the current URL path is "/login", the component or element that contains this code will not be rendered at all. If the current URL path is anything else, the component or element will be rendered normally.
  if (useLocation().pathname == "/login") {
    return null;
  }
  // switch () {
  //   case 
  // }
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
    </div>
  );
};

export default Header;
