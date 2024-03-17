import "./Price.css";
import "../Accommodation/Accommodation.css";
import Input from "../../Input";

const Price = () => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price(in million Birr)</h2>

        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </div>
    </>
  );
};

export default Price;
