import "./header.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
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
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link> */}
        </fieldset>
      </form>
    </div>
  );
};

export default Header;
