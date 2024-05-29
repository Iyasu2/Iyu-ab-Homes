import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Accommodation from "./Accommodation/Accommodation";
import Price from "./Price/Price";
import Type from "./Type/Type";
import State from "./State/State";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  const [saleSelected, setSaleSelected] = useState(false);
  const [rentSelected, setRentSelected] = useState(false);

  const accordionHeaderStyle = {
    overflow: "hidden",
    margin: "5px",
    color: "#fff",

    borderRadius: "8px", // Rounded corners for accordion headers
  };

  return (
    <div className="sidebar">
      <Accordion defaultActiveKey="0">
        {/* Type Accordion */}
        <Accordion.Item eventKey="0" className="accordion-item">
          <Accordion.Header
            className="accordion-header"
            style={accordionHeaderStyle}
          >
            Type
          </Accordion.Header>
          <Accordion.Body>
            <Type handleChange={handleChange} />
          </Accordion.Body>
        </Accordion.Item>
        {/* Accommodation Accordion */}
        <Accordion.Item eventKey="1" className="accordion-item">
          <Accordion.Header
            className="accordion-header"
            style={accordionHeaderStyle}
          >
            Accommodation
          </Accordion.Header>
          <Accordion.Body>
            <Accommodation
              handleChange={handleChange}
              saleSelected={saleSelected}
              rentSelected={rentSelected}
              setSaleSelected={setSaleSelected}
              setRentSelected={setRentSelected}
            />
          </Accordion.Body>
        </Accordion.Item>
        {/* Price Accordion */}
        <Accordion.Item eventKey="2" className="accordion-item">
          <Accordion.Header
            className="accordion-header"
            style={accordionHeaderStyle}
          >
            Price
          </Accordion.Header>
          <Accordion.Body>
            <Price
              handleChange={handleChange}
              saleSelected={saleSelected}
              rentSelected={rentSelected}
            />
          </Accordion.Body>
        </Accordion.Item>
        {/* State Accordion */}
        <Accordion.Item eventKey="3" className="accordion-item">
          <Accordion.Header
            className="accordion-header"
            style={accordionHeaderStyle}
          >
            State
          </Accordion.Header>
          <Accordion.Body>
            <State handleChange={handleChange} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Sidebar;
