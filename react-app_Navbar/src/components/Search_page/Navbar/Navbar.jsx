import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/Home_logo.png";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import menu_icon from "../../../assets/menu-icon.png";
import { AiOutlineUserAdd } from "react-icons/ai";

const Navbar = ({ handleInputChange, query }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  return (
    <nav className="container dark-nav">
      <div className="logo-and-title">
        <img src={logo} alt="" className="logo" />
        <h1>Iyu-ab Homes</h1>
      </div>
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        <li>
          <input
            className="search-input"
            type="text"
            onChange={handleInputChange}
            value={query}
            placeholder="Search homes"
          />
        </li>
        <li>
          <RouteLink to="/">About us</RouteLink>
        </li>
        <li>
          <div className="user-add-container">
            <AiOutlineUserAdd className="user-add-icon" />
          </div>
        </li>
      </ul>
      <img src={menu_icon} className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
