import Accommodation from "./Accommodation/Accommodation";
import Price from "./Price/Price";
import Type from "./Type/Type";
import "./Sidebar.css";
import State from "./State/State";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>Categories</h1>
        </div>
        <Accommodation handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <State handleChange={handleChange} />
        <Type handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
