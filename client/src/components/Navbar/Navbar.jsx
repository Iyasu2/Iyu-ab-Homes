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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = ({ isAuthenticated }) => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrollable, setScrollable] = useState(true);

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

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page
    navigate("/login");
  };

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
        {location.pathname === "/Search_homes" ||
          (location.pathname === "/details" && (
            <>
              {isAuthenticated ? (
                <li>
                  <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AiOutlineUserAdd size={24} style={{ color: "#fff" }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={
                            setting === "Logout"
                              ? handleLogout
                              : handleCloseUserMenu
                          }
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </li>
              ) : (
                <li>
                  <RouteLink to="/login">Login</RouteLink>
                </li>
              )}

              <li>
                <RouteLink to="/post">Post Homes</RouteLink>
              </li>
              <li>
                <RouteLink to="/">About us</RouteLink>
              </li>
            </>
          ))}
        {location.pathname === "/login" || location.pathname === "/post" ? (
          <>
            {location.pathname === "/post" ? (
              <>
                <li>
                  <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AiOutlineUserAdd size={24} style={{ color: "#fff" }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={
                            setting === "Logout"
                              ? handleLogout
                              : handleCloseUserMenu
                          }
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </li>
              </>
            ) : null}
            <li>
              <RouteLink to="/Search_homes">Home</RouteLink>
            </li>
            <li>
              <RouteLink to="/">About us</RouteLink>
            </li>
          </>
        ) : null}
      </ul>
      <img src={menu_icon} className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
