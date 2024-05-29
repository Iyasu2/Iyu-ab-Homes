import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth_page/Login";

const Login_page = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Login />
      </div>
    </div>
  );
};

export default Login_page;
