import React, { useState } from "react";
import Input from "../../Input";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Accommodation.css"; // Custom styles if needed
import { Button } from "react-bootstrap"; // Import Bootstrap Button component
import { Collapse } from "react-bootstrap"; // Import Bootstrap Collapse component
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Assuming you're using MUI Icons

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
      <Button
        className="sidebar-title"
        onClick={toggleDropdown}
        variant="primary"
      >
        Accommodation {showDropdown ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Collapse in={showDropdown}>
        <div className="Accom-list-style">
          <label className="sidebar-label-container">
            <input
              onChange={handleRadioChange}
              type="radio"
              value="All"
              name="test"
              className="form-check-input"
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
      </Collapse>
    </div>
  );
};

export default Accommodation;
