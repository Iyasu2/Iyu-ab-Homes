import React from "react";
import Input from "../../Input";

const State = ({ handleChange, isOpen }) => {
  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
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
    <div style={{ display: isOpen ? "block" : "none" }}>
      {stateOptions.map((option) => (
        <Input
          key={option.value}
          handleChange={handleStateChange}
          value={option.value}
          title={option.title}
          name="test4"
        />
      ))}
    </div>
  );
};

export default State;