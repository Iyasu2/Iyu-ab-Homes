import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import ProfileInformation from "./components/Dashboard/ProfileInformation";
import PropertyForm from "./components/Post/PropertyForm";
import PropertyPage from "./components/Post/PropertyPage";
import { Container, Row, Col } from "react-bootstrap";
import "./Dashboard_page.css";

const Dashboard_page = ({ isAuthenticated }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");

  let renderedComponent;

  // Determine which component to render based on activeMenuItem
  if (activeMenuItem === "profile") {
    renderedComponent = <ProfileInformation />;
  } else if (activeMenuItem === "new-post") {
    renderedComponent = <PropertyForm />;
  } else if (activeMenuItem === "posts") {
    renderedComponent = <PropertyPage />;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />

      <Container fluid>
        <div className="body-container_dash">
          <div className="dash">
            <Dashboard
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
            />
          </div>
          <div className="restofpage_container">{renderedComponent}</div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard_page;
