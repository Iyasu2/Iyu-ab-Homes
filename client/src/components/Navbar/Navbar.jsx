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
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = ({ isAuthenticated }) => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrollable, setScrollable] = useState(true);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    // You can optionally redirect the user to the login page after logout
    window.location.href = "/login";
  };

  console.log((isAuthenticated = { isAuthenticated }));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setScrollable(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setScrollable(true);
  };

  useEffect(() => {
    if (scrollable) {
      document.body.classList.remove("disable-scroll");
    } else {
      document.body.classList.add("disable-scroll");
    }
  }, [scrollable]);

  const location = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  return (
    <nav
      className={`nav-container ${
        location.pathname === "/about" ? (sticky ? "dark-nav" : "") : "dark-nav"
      }`}
    >
      <div className="logo-and-title">
        <img src={logo} alt="" className="logo" />
        <h1>Iyu-ab Homes</h1>
      </div>
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        {location.pathname === "/about" ? (
          <>
            <li>
              <Link to="hero" smooth={true} offset={0} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <RouteLink to="/">Find Homes</RouteLink>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-150} duration={500}>
                About
              </Link>
            </li>
            {isAuthenticated ? (
              <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </li>
            ) : (
              <li>
                <RouteLink to="/login">Login</RouteLink>
              </li>
            )}
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
        ) : (
          <>
            <li>
              <RouteLink to="/">Home</RouteLink>
            </li>
            <li>
              <RouteLink to="/about">About us</RouteLink>
            </li>
            {isAuthenticated ? (
              <>
                <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </li>
                <li>
                  <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Open settings">
                      {/* Wrap IconButton with Link */}
                      <RouteLink
                        to="/dashboard"
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton sx={{ p: 0 }}>
                          <AiOutlineUserAdd
                            size={24}
                            style={{ color: "#fff" }}
                          />
                        </IconButton>
                      </RouteLink>
                    </Tooltip>
                  </Box>
                </li>
              </>
            ) : (
              <li>
                <RouteLink to="/login">Login</RouteLink>
              </li>
            )}
          </>
        )}
      </ul>
      <img src={menu_icon} className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
