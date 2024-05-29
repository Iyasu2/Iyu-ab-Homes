import React from "react";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Auth_page/SignUp";

const SignUp_page = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUp_page;
