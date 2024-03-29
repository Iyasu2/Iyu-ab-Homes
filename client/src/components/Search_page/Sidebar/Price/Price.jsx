import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const Price = ({ handleChange, saleSelected, rentSelected }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Price");
  };

  const priceRanges = [
    { value: "All", title: "All" }, // Add an "All" option
    { value: "0-10000", title: "0 - 10,000 Birr" },
    { value: "10000-20000", title: "10 - 20,000 Birr" },
    { value: "20000-30000", title: "20 - 30,000 Birr" },
    { value: "30000-40000", title: "30 - 40,000 Birr" },
    { value: "40000-50000", title: "40 - 50,000 Birr" },
    { value: "50000-1000000", title: "Over 50,000 Birr" },
    { value: "0-10000000", title: "Below 10,000,000 Birr" },
    { value: "10000000-20000000", title: "10 - 20,000,000 Birr" },
    { value: "20000000-30000000", title: "20 - 30,000,000 Birr" },
    { value: "30000000-40000000", title: "30 - 40,000,000 Birr" },
    { value: "40000000-50000000", title: "40 - 50,000,000 Birr" },
    { value: "50000000-1000000000", title: "Over 50,000,000 Birr" },
  ];

  // Filter priceRanges based on saleSelected and rentSelected
  const filteredPriceRanges = priceRanges.filter((range, index) => {
    if (saleSelected) {
      return index === 0 || (index >= 7 && index <= 12);
    } else if (rentSelected) {
      return index >= 0 && index <= 6;
    }
    return true; // If neither sale nor rent is selected, show all
  });

  return (
    <div className="Accom-style">
      <Button
        className="sidebar-title"
        onClick={toggleDropdown}
        variant="primary"
      >
        Price {showDropdown ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Collapse in={showDropdown}>
        <div className="Accom-list-style">
          {filteredPriceRanges.map((range) =>
            range.isText ? (
              <p key={range.value}>{range.title}</p>
            ) : (
              <label key={range.value} className="sidebar-label-container">
                <input
                  onChange={handleRadioChange}
                  type="radio"
                  value={range.value}
                  name="price"
                  className="form-check-input"
                />
                <span className="checkmark"></span>
                {range.title}
              </label>
            )
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default Price;
