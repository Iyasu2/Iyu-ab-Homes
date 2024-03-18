import "./Price.css";
import "../Accommodation/Accommodation.css";
import Input from "../../Input";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price(in million Birr)</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="0-10000000"
          title="0 - 10"
          name="test2"
        />
        <Input
          handleChange={handleChange}
          value="10000000-20000000"
          title="10 - 20"
          name="test2"
        />
        <Input
          handleChange={handleChange}
          value="20000000-30000000"
          title="20 - 30"
          name="test2"
        />
        <Input
          handleChange={handleChange}
          value="30000000-40000000"
          title="30 - 40"
          name="test2"
        />
        <Input
          handleChange={handleChange}
          value="40000000-50000000"
          title="40 - 50"
          name="test2"
        />
        <Input
          handleChange={handleChange}
          value="50000000-100000000"
          title="Over 50"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
