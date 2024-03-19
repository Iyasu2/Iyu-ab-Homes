import "./Type.css";
import "../Accommodation/Accommodation.css";
import Input from "../../Input";

const Type = ({ handleChange }) => {
  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Type");
  };

  return (
    <div className="ml sidebar-content">
      <h2 className="sidebar-title price-title">Type</h2>
      <label className="sidebar-label-container">
        <input
          onChange={handleRadioChange}
          type="radio"
          value="All"
          name="test4"
        />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleRadioChange}
        value="Apartment"
        title="Apartment"
        name="test4"
      />
      <Input
        handleChange={handleRadioChange}
        value="Condominium"
        title="Condominium"
        name="test4"
      />
      <Input
        handleChange={handleRadioChange}
        value="Personal home"
        title="Personal home"
        name="test4"
      />
    </div>
  );
};

export default Type;
