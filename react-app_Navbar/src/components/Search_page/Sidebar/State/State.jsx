import Input from "../../Input";
import "../Accommodation/Accommodation.css";
import "./State.css";

const State = ({ handleChange }) => {
  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">State</h2>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test3" />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleChange}
        value="Addis Ababa"
        title="Addis Ababa"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="DireDawa"
        title="DireDawa"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Oromia"
        title="Oromia"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Amhara"
        title="Amhara"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Tigray"
        title="Tigray"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Debub"
        title="Debub"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Sidama"
        title="Sidama"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Afar"
        title="Afar"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Somali"
        title="Somali"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Benshangul Gumuz"
        title="Benshangul Gumuz"
        name="test3"
      />
      <Input
        handleChange={handleChange}
        value="Harari"
        title="Harari"
        name="test3"
      />
    </div>
  );
};

export default State;
