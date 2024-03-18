import Input from "../../Input";
import "./Accommodation.css";

const Accommodation = ({ handleChange }) => {
  return (
    <div>
      <h2 className="sidebar-title">Accommodation</h2>

      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test" />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleChange}
        value="Sale"
        title="Sale"
        name="test"
      />
      <Input
        handleChange={handleChange}
        value="Rent"
        title="Rent"
        name="test"
      />
    </div>
  );
};

export default Accommodation;
