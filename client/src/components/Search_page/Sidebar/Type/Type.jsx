// Type.jsx
import React from "react";
import Input from "../../Input";

const Type = ({ handleChange, isOpen }) => {
  const handleRadioChange = (event) => {
    handleChange(event, "Type");
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <label className="sidebar-label-container">
        <input
          onChange={handleRadioChange}
          type="radio"
          value="All"
          name="test4"
          className="form-check-input"
        />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleRadioChange}
        value="Apartment"
        title="Apartment"
        name="test4"
      />
      <Input
        handleChange={handleRadioChange}
        value="Condominium"
        title="Condominium"
        name="test4"
      />
      <Input
        handleChange={handleRadioChange}
        value="Personal home"
        title="Personal home"
        name="test4"
      />
    </div>
  );
};

export default Type;
