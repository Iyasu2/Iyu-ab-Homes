import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./State.css";
import { Button, Collapse } from "react-bootstrap";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const State = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
    handleChange(event, "State");
  };

  const stateOptions = [
    { value: "All", title: "All" },
    { value: "Addis Ababa", title: "Addis Ababa" },
    { value: "DireDawa", title: "DireDawa" },
    { value: "Oromia", title: "Oromia" },
    { value: "Amhara", title: "Amhara" },
    { value: "Tigray", title: "Tigray" },
    { value: "Debub", title: "Debub" },
    { value: "Sidama", title: "Sidama" },
    { value: "Afar", title: "Afar" },
    { value: "Somali", title: "Somali" },
    { value: "Benshangul Gumuz", title: "Benshangul Gumuz" },
    { value: "Harari", title: "Harari" },
  ];

  return (
    <div className="Accom-style price-style">
      <Button
        className="sidebar-title"
        onClick={toggleDropdown}
        variant="primary"
      >
        State {showDropdown ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={showDropdown}>
        <div className="Accom-list-style">
          {stateOptions.map((option) => (
            <label key={option.value} className="sidebar-label-container">
              <input
                onChange={handleStateChange}
                type="radio"
                value={option.value}
                name="stateOption"
                checked={selectedState === option.value}
                className="form-check-input"
              />
              <span className="checkmark"></span>
              {option.title}
            </label>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default State;
