import Input from "../../Input";
import "../Accommodation/Accommodation.css";
import "./State.css";

const State = ({ handleChange }) => {
  const handleRadioChange = (event) => {
    // Include the component name and event object in the callback
    handleChange(event, "State");
  };

  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">State</h2>
      <label className="sidebar-label-container">
        <input
          onChange={handleRadioChange}
          type="radio"
          value="All"
          name="test3"
        />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleRadioChange}
        value="Addis Ababa"
        title="Addis Ababa"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="DireDawa"
        title="DireDawa"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Oromia"
        title="Oromia"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Amhara"
        title="Amhara"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Tigray"
        title="Tigray"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Debub"
        title="Debub"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Sidama"
        title="Sidama"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Afar"
        title="Afar"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Somali"
        title="Somali"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Benshangul Gumuz"
        title="Benshangul Gumuz"
        name="test3"
      />
      <Input
        handleChange={handleRadioChange}
        value="Harari"
        title="Harari"
        name="test3"
      />
    </div>
  );
};

export default State;
