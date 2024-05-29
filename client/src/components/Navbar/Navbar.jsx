import React from "react";
import "./Navbar.css";
import logo from "../../assets/Home_logo.png";
import {
  Link as RouteLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-container fixed-top">
      <Navbar.Brand as={RouteLink} to="/" className="logo-container">
        <div className="logo-wrapper">
          <img src={logo} alt="" className="logo" />
          <span className="brand-text">Gojo</span>
        </div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <>
              {user.avatar ? (
                <Nav.Link as={RouteLink} to="/dashboard">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="profile-image"
                  />
                </Nav.Link>
              ) : (
                <Nav.Link as={RouteLink} to="/dashboard">
                  <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
              )}
              <NavLink as={RouteLink} to="/" className="nav-link">
                SEARCH
              </NavLink>
              <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
            </>
          ) : (
            <>
              <NavLink as={RouteLink} to="/" className="nav-link">
                SEARCH
              </NavLink>
              <Nav.Link as={RouteLink} to="/about">
                ABOUT US
              </Nav.Link>
              <Nav.Link as={RouteLink} to="/login">
                LOGIN
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
