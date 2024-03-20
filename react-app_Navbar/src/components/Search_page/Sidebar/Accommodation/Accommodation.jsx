import React, { useState } from "react";
import Input from "../../Input";
import "./Accommodation.css";

const Accommodation = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Accommodation");
  };

  return (
    <div className="Accom-style">
      <button className="sidebar-title" onClick={toggleDropdown}>
        Accommodation <span className="arrow-down">&#9660;</span>
      </button>

      {showDropdown && (
        <div className="Accom-list-style">
          <label className="sidebar-label-container">
            <input
              onChange={handleRadioChange}
              type="radio"
              value="All"
              name="test"
            />
            <span className="checkmark"></span>All
          </label>
          <Input
            handleChange={handleRadioChange}
            value="Sale"
            title="Sale"
            name="test"
          />
          <Input
            handleChange={handleRadioChange}
            value="Rent"
            title="Rent"
            name="test"
          />
        </div>
      )}
    </div>
  );
};

export default Accommodation;
