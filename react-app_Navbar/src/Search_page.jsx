import React, { useState } from "react";
import Navbar from "./components/Search_page/Navbar/Navbar";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import Card from "./components/Search_page/Card";
import "./components/Search_page/index_search.css";
import homes from "./components/Search_page/db/data";
import Products from "./components/Search_page/Products/Products";

const Search_page = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = homes.filter(
    (home) =>
      home.Type.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1 ||
      home.City.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1 ||
      home.State.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "All") {
      selectedCategory(null);
    } else {
      setSelectedCategory(selectedValue);
    }
  };

  const filteredhome = (homes, selected, query) => {
    let filteredhomes = homes;

    // Filtering Input Items
    if (query) {
      filteredhomes = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredhomes = filteredhomes.filter(
        ({ Type, State, Accommodation, Price, title }) =>
          selected === "All" ||
          Type === selected ||
          State === selected ||
          Accommodation === selected ||
          Price === selected ||
          title === selected
      );
    }

    return filteredhomes.map(
      ({
        img,
        Type,
        Total_Area,
        Built_in_Area,
        State,
        City,
        Town,
        Floors,
        Accommodation,
        Price,
        title,
      }) => (
        <Card
          key={Math.random()}
          img={img}
          Type={Type}
          Total_Area={Total_Area}
          Built_in_Area={Built_in_Area}
          State={State}
          City={City}
          Town={Town}
          Floors={Floors}
          Accommodation={Accommodation}
          Price={Price}
          title={title}
        />
      )
    );
  };

  const result = filteredhome(homes, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navbar query={query} handleInputChange={handleInputChange} />
      <Products result={result} />
    </>
  );
};

export default Search_page;
