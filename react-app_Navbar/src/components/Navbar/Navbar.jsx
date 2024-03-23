import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Home_logo.png";
import { Link } from "react-scroll";
import { Link as RouteLink, useLocation } from "react-router-dom";
import menu_icon from "../../assets/menu-icon.png";
import { AiOutlineUserAdd } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = ({ handleInputChange, query }) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setScrollable(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setScrollable(true);
  };

  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    if (scrollable) {
      document.body.classList.remove("disable-scroll");
    } else {
      document.body.classList.add("disable-scroll");
    }
  }, [scrollable]);

  const location = useLocation();

  return (
    <nav
      className={`nav-container ${
        location.pathname === "/" ? (sticky ? "dark-nav" : "") : "dark-nav"
      }`}
    >
      <div className="logo-and-title">
        <img src={logo} alt="" className="logo" />
        <h1>Iyu-ab Homes</h1>
      </div>
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        {location.pathname === "/" && (
          <>
            <li>
              <Link to="hero" smooth={true} offset={0} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <RouteLink to="Search_homes">Find Homes</RouteLink>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-150} duration={500}>
                About
              </Link>
            </li>
            <li>
              <RouteLink to="/login">Login</RouteLink>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                offset={-260}
                duration={500}
                className="btn"
              >
                Contact us
              </Link>
            </li>
          </>
        )}
        {location.pathname === "/Search_homes" && (
          <>
            <li>
              <RouteLink to="/">About us</RouteLink>
            </li>
            <li>
              <RouteLink to="/login">Login</RouteLink>
            </li>
          </>
        )}
        {location.pathname === "/login" && (
          <>
            <li>
              <RouteLink to="/">About us</RouteLink>
            </li>
            <li>
              <RouteLink to="/Search_homes">Home</RouteLink>
            </li>
          </>
        )}
      </ul>
      <img src={menu_icon} className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
