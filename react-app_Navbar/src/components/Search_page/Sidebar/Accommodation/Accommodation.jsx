import Input from "../../Input";
import "./Accommodation.css";

const Accommodation = ({ handleChange }) => {
  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "Accommodation");
  };

  return (
    <div>
      <h2 className="sidebar-title">Accommodation</h2>

      <label className="sidebar-label-container">
        <input
          onChange={handleRadioChange}
          type="radio"
          value="All"
          name="test"
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
  );
};

export default Accommodation;
