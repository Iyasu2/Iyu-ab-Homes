import React from "react";
import "./Accommodation.css";

const Accommodation = ({
  handleChange,
  saleSelected,
  rentSelected,
  setSaleSelected,
  setRentSelected,
}) => {
  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    handleChange(event, "Accommodation");
    if (selectedValue === "Sale") {
      setSaleSelected(true);
      setRentSelected(false);
    } else if (selectedValue === "Rent") {
      setRentSelected(true);
      setSaleSelected(false);
    } else {
      // "All" selected
      setSaleSelected(false);
      setRentSelected(false);
    }
  };

  return (
    <div className="type-container">
      <div className="options-container">
        <label
          className={`option-label ${!saleSelected && !rentSelected ? "selected" : ""}`}
          onClick={() => handleRadioChange({ target: { value: "All" } })}
        >
          <input
            type="radio"
            value="All"
            name="accommodation"
            className="form-check-input"
            checked={!saleSelected && !rentSelected}
            onChange={handleRadioChange}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          All
        </label>
        <label
          className={`option-label ${saleSelected ? "selected" : ""}`}
          onClick={() => handleRadioChange({ target: { value: "Sale" } })}
        >
          <input
            type="radio"
            value="Sale"
            name="accommodation"
            className="form-check-input"
            checked={saleSelected}
            onChange={handleRadioChange}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          Sale
        </label>
        <label
          className={`option-label ${rentSelected ? "selected" : ""}`}
          onClick={() => handleRadioChange({ target: { value: "Rent" } })}
        >
          <input
            type="radio"
            value="Rent"
            name="accommodation"
            className="form-check-input"
            checked={rentSelected}
            onChange={handleRadioChange}
          />
          <div className="custom-radio">
            <div className="custom-radio-dot"></div>
          </div>
          Rent
        </label>
      </div>
    </div>
  );
};

export default Accommodation;
