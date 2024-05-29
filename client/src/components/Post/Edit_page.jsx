import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PropertyForm from "./PropertyForm";

const EditProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state;

  return (
    <div>
      <Navbar />
      <PropertyForm property={property} />
    </div>
  );
};

export default EditProperty;
