const Input = ({ handleChange, value, title, name, color }) => {
  return (
    <label className="sidebar-label-container">
      <input type="radio" value="" name="test" />
      <span className="checkmark"></span>All
    </label>
  );
};

export default Input;
