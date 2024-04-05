import React from "react";
import Input from "../../Input";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Accommodation.css";
import { Button } from "react-bootstrap";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const Accommodation = ({
  handleChange,
  saleSelected,
  rentSelected,
  setSaleSelected,
  setRentSelected,
  isOpen,
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
      setSaleSelected(false);
      setRentSelected(false);
    }
  };

  return (
    <div className="Accom-style" style={{ display: isOpen ? "block" : "none" }}>
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
    </div>
  );
};

export default Accommodation;