import React, { useState } from "react";
import Navbar from "./components/Search_page/Navbar/Navbar";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import Card from "./components/Search_page/Card";
import "./components/Search_page/index_search.css";
import homes from "./components/Search_page/db/data";
import Products from "./components/Search_page/Products/Products";

const Search_page = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

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
  const handleChange = (event, category) => {
    const selectedValue = event.target.value;

    setSelectedCategory((prevSelectedCategory) => {
      // Find the index of the existing category in the array
      const index = prevSelectedCategory.findIndex(
        (item) => item.category === category
      );

      // If the category is already in the array, update its value
      if (index !== -1) {
        return prevSelectedCategory.map((item, i) =>
          i === index ? { category, value: selectedValue } : item
        );
      }

      // If the category is not in the array, add it
      return [...prevSelectedCategory, { category, value: selectedValue }];
    });
  };

  const filteredhome = (homes, selected, query) => {
    let filteredhomes = homes;

    // Filtering Input Items
    if (query) {
      filteredhomes = filteredItems;
    }

    // Applying selected filter
    const match_selected = (home, selected) => {
      const matchingPairs = [];
      for (const { category, value } of selected) {
        if (category === "All") {
          return matchingPairs;
        }
        if (home[category] !== value) {
          return []; // If a pair doesn't match, return an empty array
        }
        matchingPairs.push({ [category]: value });
      }
      console.log(matchingPairs);
      return matchingPairs; // If all pairs match, return the matching pairs
    };

    // Applying selected filter
    if (selected) {
      filteredhomes = filteredhomes.filter((home) => {
        const matchingPairs = match_selected(home, selected);
        return matchingPairs.length > 0;
      });
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
