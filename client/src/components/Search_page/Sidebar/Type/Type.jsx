import React, { useState } from "react";
import Input from "../../Input";
import { Button, Collapse } from "react-bootstrap"; // Import Bootstrap Button and Collapse components
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Assuming you're using MUI Icons

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
      <Button
        className="sidebar-title"
        onClick={toggleDropdown}
        variant="primary"
      >
        Type {showDropdown ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Collapse in={showDropdown}>
        <div className="Accom-list-style">
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
      </Collapse>
    </div>
  );
};

export default Type;
