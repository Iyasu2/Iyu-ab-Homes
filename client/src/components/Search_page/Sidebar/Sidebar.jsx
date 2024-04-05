import React, { useState } from "react";
import "./Sidebar.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Ui/accordion"; // Adjust the import path as per your project structure
import Accommodation from "./Accommodation/Accommodation";
import Price from "./Price/Price";
import Type from "./Type/Type";
import State from "./State/State";

const Sidebar = ({ handleChange }) => {
  const [saleSelected, setSaleSelected] = useState(false);
  const [rentSelected, setRentSelected] = useState(false);
  const [isTypeAccordionOpen, setIsTypeAccordionOpen] = useState(false);
  const [isStateAccordionOpen, setIsStateAccordionOpen] = useState(false);
  const [isAccommodationAccordionOpen, setIsAccommodationAccordionOpen] = useState(false);
  const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(false);

  return (
    <div >
      <div className="sidebar">
        <h1 style={{ textAlign: "center" }}>Filter</h1>
        <Accordion type="multiple" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={() => setIsTypeAccordionOpen(!isTypeAccordionOpen)}>
              Type
            </AccordionTrigger>
            <AccordionContent>
              <Type
                handleChange={handleChange}
                isOpen={isTypeAccordionOpen}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
  <AccordionTrigger onClick={() => setIsAccommodationAccordionOpen(!isAccommodationAccordionOpen)}>
    Accommodation
  </AccordionTrigger>
  <AccordionContent>
    <Accommodation
      handleChange={handleChange}
      saleSelected={saleSelected}
      rentSelected={rentSelected}
      setSaleSelected={setSaleSelected}
      setRentSelected={setRentSelected}
      isOpen={isAccommodationAccordionOpen}
    />
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-3">
  <AccordionTrigger onClick={() => setIsPriceAccordionOpen(!isPriceAccordionOpen)}>
    Price
  </AccordionTrigger>
  <AccordionContent>
    <Price
      handleChange={handleChange}
      saleSelected={saleSelected}
      rentSelected={rentSelected}
      isOpen={isPriceAccordionOpen}
    />
  </AccordionContent>
</AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger onClick={() => setIsStateAccordionOpen(!isStateAccordionOpen)}>
              State
            </AccordionTrigger>
            <AccordionContent>
              <State handleChange={handleChange} isOpen={isStateAccordionOpen} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;