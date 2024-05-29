import React, { useState } from "react";
import "./Type.css";

const Type = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState("All");

  const handleSelection = (value) => {
    setSelectedOption(value);
    handleChange({ target: { value } }, "Type");
  };

  return (
    <div className="type-container">
      {/* Radio Options */}
      <div className="options-container">
        <label
          className={`option-label ${
            selectedOption === "All" ? "selected" : ""
          }`}
          onClick={() => handleSelection("All")}
        >
          <input
            type="radio"
            value="All"
            checked={selectedOption === "All"}
            onChange={() => {}}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          All
        </label>
        {/* Add more options similarly */}
        <label
          className={`option-label ${
            selectedOption === "Apartment" ? "selected" : ""
          }`}
          onClick={() => handleSelection("Apartment")}
        >
          <input
            type="radio"
            value="Apartment"
            checked={selectedOption === "Apartment"}
            onChange={() => {}}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          Apartment
        </label>
        <label
          className={`option-label ${
            selectedOption === "Condominium" ? "selected" : ""
          }`}
          onClick={() => handleSelection("Condominium")}
        >
          <input
            type="radio"
            value="Condominium"
            checked={selectedOption === "Condominium"}
            onChange={() => {}}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          Condominium
        </label>
        <label
          className={`option-label ${
            selectedOption === "Personal home" ? "selected" : ""
          }`}
          onClick={() => handleSelection("Personal home")}
        >
          <input
            type="radio"
            value="Personal home"
            checked={selectedOption === "Personal home"}
            onChange={() => {}}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          Private Home
        </label>
      </div>
    </div>
  );
};

export default Type;
