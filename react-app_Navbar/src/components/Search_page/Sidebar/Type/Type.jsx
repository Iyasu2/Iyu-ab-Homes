import "./Type.css";
import "../Accommodation/Accommodation.css";
import Input from "../../Input";

const Type = ({ handleChange }) => {
  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Type</h2>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test4" />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleChange}
        value="Apartment"
        title="Apartment"
        name="test4"
      />
      <Input
        handleChange={handleChange}
        value="Condominium"
        title="Condominium"
        name="test4"
      />
      <Input
        handleChange={handleChange}
        value="Personal home"
        title="Personal home"
        name="test4"
      />
    </div>
  );
};

export default Type;
