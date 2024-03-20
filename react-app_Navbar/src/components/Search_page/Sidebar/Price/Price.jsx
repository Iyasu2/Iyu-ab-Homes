import React, { useState } from "react";
import Input from "../../Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Price");
  };

  return (
    <div className="Accom-style price-style">
      <button className="sidebar-title" onClick={toggleDropdown}>
        Price <span className="arrow-down">&#9660;</span>
      </button>

      {showDropdown && (
        <div className="Accom-list-style">
          <label className="sidebar-label-container">
            <input
              onChange={handleRadioChange}
              type="radio"
              value="All"
              name="test2"
            />
            <span className="checkmark"></span>All
          </label>

          <h3 className="semi-title">For sale(in million Birr)</h3>

          <Input
            handleChange={handleRadioChange}
            value="1000000-10000000"
            title="1 - 10"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="10000000-20000000"
            title="10 - 20"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="20000000-30000000"
            title="20 - 30"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="30000000-40000000"
            title="30 - 40"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="40000000-50000000"
            title="40 - 50"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="50000000-100000000"
            title="Over 50"
            name="test2"
          />

          <h3 className="semi-title">For rent(in thousand Birr)</h3>

          <Input
            handleChange={handleRadioChange}
            value="0-10000"
            title="0 - 10"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="10000-20000"
            title="10 - 20"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="20000-30000"
            title="20 - 30"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="30000-40000"
            title="30 - 40"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="40000-50000"
            title="40 - 50"
            name="test2"
          />
          <Input
            handleChange={handleRadioChange}
            value="50000-100000"
            title="Over 50"
            name="test2"
          />
        </div>
      )}
    </div>
  );
};

export default Price;
