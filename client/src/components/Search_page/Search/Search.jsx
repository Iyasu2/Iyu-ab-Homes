import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ handleInputChange, query }) => {
  return (
    <div>
      <div className="search-input">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search homes"
        />
      </div>
    </div>
  );
};

export default Search;
