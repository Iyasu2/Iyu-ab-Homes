import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/Details/Details";

const Details_page = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Details />
    </div>
  );
};

export default Details_page;
