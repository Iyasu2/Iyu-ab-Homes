import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/Home_logo.png";
import { Link as RouteLink, NavLink, useLocation, useNavigate } from "react-router-dom"; // Import NavLink
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"; // Import Button from react-bootstrap
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

const MyNavbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-container ${
        location.pathname === "/about" ? (sticky ? "dark-nav" : "") : "dark-nav"
      }`}
      sticky={sticky ? "top" : ""}
    >
      <Navbar.Brand as={RouteLink} to="/" className="logo-container">
  <div className="logo-wrapper">
    <img src={logo} alt="" className="logo" />
    <span className="brand-text">Gojo</span>
  </div>
</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleMenu} />
      <Navbar.Collapse id="responsive-navbar-nav" className={`${mobileMenu ? "show" : ""}`}>
        <Nav className="ml-auto">
          {user ? (
            <>
              <Nav.Link as={RouteLink} to="/dashboard">{user.email}</Nav.Link>
              {/* Wrap Button component in NavLink */}
              <NavLink as={RouteLink} to="/" className="nav-link">SEARCH</NavLink>
              
              <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
             
            </>
          ) : (
            <>
              {/* Wrap Button component in NavLink */}
              <NavLink as={RouteLink} to="/" className="nav-link">SEARCH</NavLink>
              <Nav.Link as={RouteLink} to="/about">ABOUT US</Nav.Link>
              <Nav.Link as={RouteLink} to="/login">LOGIN</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
