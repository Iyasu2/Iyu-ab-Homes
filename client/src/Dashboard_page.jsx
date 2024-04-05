import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

const Dashboard_page = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Dashboard />
    </div>
  );
};

export default Dashboard_page;
