import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Details from "./components/Details/Details_pub";

const Info_page = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Details />
    </div>
  );
};

export default Info_page;
