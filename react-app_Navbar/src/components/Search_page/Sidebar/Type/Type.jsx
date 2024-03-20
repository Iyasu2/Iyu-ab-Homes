import React, { useState } from "react";
import Input from "../../Input";

const Type = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Type");
  };

  return (
    <div className="Accom-style">
      <button className="sidebar-title" onClick={toggleDropdown}>
        Type <span className="arrow-down">&#9660;</span>
      </button>

      {showDropdown && (
        <div className="Accom-list-style">
          <label className="sidebar-label-container">
            <input
              onChange={handleRadioChange}
              type="radio"
              value="All"
              name="test4"
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
      )}
    </div>
  );
};

export default Type;
