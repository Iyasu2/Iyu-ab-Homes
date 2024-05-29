import React, { useState } from "react";
import Input from "../../Input";
import "./State.css";

const State = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState("All");

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
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
    <div className="type-container">
      <div className="options-container">
        {stateOptions.map((option) => (
          <label
            key={option.value}
            className={`option-label ${selectedOption === option.value ? "selected" : ""}`}
            onClick={() => handleStateChange({ target: { value: option.value } })}
          >
            <input
              type="radio"
              value={option.value}
              name="stateOption"
              className="form-check-input"
              checked={selectedOption === option.value}
              onChange={handleStateChange}
            />
            <div className="custom-radio">
              <div className="custom-radio-dot"></div>
            </div>
            {option.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default State;
