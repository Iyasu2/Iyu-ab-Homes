import React, { useState } from "react";
import Navbar from "./components/Search_page/Navbar/Navbar";
import Products from "./components/Search_page/Products/Products";
import products from "./components/Search_page/db/data";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import Card from "./components/Search_page/Card";
import "./components/Search_page/index_search.css";
import homes from "components/Search_page/db/data";

const Search_page = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = homes.filter(
    (home) => home.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = (homes, selected, query) => {
    let filteredhomes = homes;

    // Filtering Input Items
    if (query) {
      filteredhomes = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredhomes = filteredhomes.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredhomes.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  };

  const result = filteredData(homes, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navbar />
      <homes result={result} />
    </>
  );
};

export default Search_page;
