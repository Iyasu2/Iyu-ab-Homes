import React, { useState } from "react";
import "./Price.css"; // Import custom CSS for Price component

const Price = ({ handleChange, saleSelected, rentSelected }) => {
  const [selectedOption, setSelectedOption] = useState("All");

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    handleChange({ target: { value: selectedValue } }, "Price");
  };

  const priceRanges = [
    { value: "All", title: "All" },
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

  const filteredPriceRanges = priceRanges.filter((range, index) => {
    if (saleSelected) {
      return index === 0 || (index >= 7 && index <= 12);
    } else if (rentSelected) {
      return index >= 0 && index <= 6;
    }
    return true; // If neither sale nor rent is selected, show all
  });

  return (
    <div className="type-container">
      <div className="options-container">
        {filteredPriceRanges.map((range) => (
          <label key={range.value} className={`option-label ${selectedOption === range.value ? "selected" : ""}`}>
            <input
              type="radio"
              name="price"
              value={range.value}
              checked={selectedOption === range.value}
              onChange={handleRadioChange}
            />
            <div className="custom-radio">
              <div className="custom-radio-dot"></div>
            </div>
            {range.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Price;
