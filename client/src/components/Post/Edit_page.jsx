import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProperyForm from "../Post/PropertyForm";

const EditProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state;

  return (
    <div>
      <h1>Edit Property</h1>
      <ProperyForm property={property} />
    </div>
  );
};

export default EditProperty;
