import React, { useState } from "react";
import Input from "../../Input";

const State = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "State");
  };

  return (
    <div className="Accom-style">
      <button className="sidebar-title" onClick={toggleDropdown}>
        State <span className="arrow-down">&#9660;</span>
      </button>

      {showDropdown && (
        <div className="Accom-list-style">
          <label className="sidebar-label-container">
            <input
              onChange={handleRadioChange}
              type="radio"
              value="All"
              name="test3"
            />
            <span className="checkmark"></span>All
          </label>
          <Input
            handleChange={handleRadioChange}
            value="Addis Ababa"
            title="Addis Ababa"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="DireDawa"
            title="DireDawa"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Oromia"
            title="Oromia"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Amhara"
            title="Amhara"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Tigray"
            title="Tigray"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Debub"
            title="Debub"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Sidama"
            title="Sidama"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Afar"
            title="Afar"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Somali"
            title="Somali"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Benshangul Gumuz"
            title="Benshangul Gumuz"
            name="test3"
          />
          <Input
            handleChange={handleRadioChange}
            value="Harari"
            title="Harari"
            name="test3"
          />
        </div>
      )}
    </div>
  );
};

export default State;
