import { React, useState } from "react";
import Accommodation from "./Accommodation/Accommodation";
import Price from "./Price/Price";
import Type from "./Type/Type";
import "./Sidebar.css";
import State from "./State/State";

const Sidebar = ({ handleChange }) => {
  const [saleSelected, setSaleSelected] = useState(false);
  const [rentSelected, setRentSelected] = useState(false);

  return (
    <div className="sidebar-container">
      <div className="sidebar bg-light">
        <div className="logo-container">
          <h1>Filter</h1>
        </div>
        <div className="mb-3">
          <Type handleChange={handleChange} />
        </div>
        <div className="mb-3">
          <Accommodation
            handleChange={handleChange}
            saleSelected={saleSelected}
            rentSelected={rentSelected}
            setSaleSelected={setSaleSelected}
            setRentSelected={setRentSelected}
          />
        </div>
        <div className="mb-3">
          <Price
            handleChange={handleChange}
            saleSelected={saleSelected}
            rentSelected={rentSelected}
          />
        </div>
        <div className="mb-3">
          <State handleChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
