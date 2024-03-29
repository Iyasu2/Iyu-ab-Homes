import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import homesData from "./components/Search_page/db/data";
import CardComponent from "./components/Search_page/Card";
import "./Search_page.css";
import Search from "./components/Search_page/Search/Search";

const Search_page = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [query, setQuery] = useState("");
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties/all",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const homesFromDatabase = await response.json();

        if (homesFromDatabase && homesFromDatabase.length > 0) {
          const updatedHomes = [...homesData, ...homesFromDatabase];
          setHomes(updatedHomes);
        } else {
          setHomes(homesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = homes.filter(
    (home) =>
      home.type.toLowerCase().includes(query.toLowerCase()) ||
      home.city.toLowerCase().includes(query.toLowerCase()) ||
      home.state.toLowerCase().includes(query.toLowerCase()) ||
      home.accommodation.toLowerCase().includes(query.toLowerCase()) ||
      home.town.toLowerCase().includes(query.toLowerCase()) ||
      home.price.toString().toLowerCase().includes(query.toLowerCase()) ||
      home.floors.toLowerCase().includes(query.toLowerCase()) ||
      home.totalArea.toLowerCase().includes(query.toLowerCase()) ||
      home.builtInArea.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event, category) => {
    const selectedValue = event.target.value;
    const lowercaseCategory = category.toLowerCase(); // Convert category to lowercase
    console.log(`Selected ${lowercaseCategory}: ${selectedValue}`);

    setSelectedCategory((prevSelectedCategory) => {
      if (selectedValue === "All") {
        return prevSelectedCategory.filter(
          (item) => item.category !== lowercaseCategory
        );
      }

      const index = prevSelectedCategory.findIndex(
        (item) => item.category === lowercaseCategory
      );

      if (index !== -1) {
        const updatedSelectedCategory = [...prevSelectedCategory];
        updatedSelectedCategory[index] = {
          category: lowercaseCategory,
          value: selectedValue,
        };
        return updatedSelectedCategory;
      }

      return [
        ...prevSelectedCategory,
        { category: lowercaseCategory, value: selectedValue },
      ];
    });
  };

  const filteredhome = (homes, selected, query) => {
    let filteredhomes = homes;

    if (query) {
      filteredhomes = filteredItems;
    }

    const match_selected = (home, selected) => {
      const matchingPairs = [];
      for (const { category, value } of selected) {
        if (category === "All") {
          return matchingPairs;
        }
        if (category === "price") {
          const [min, max] = value.split("-").map(Number);
          if (home[category] > min && home[category] <= max) {
            matchingPairs.push({ [category]: value });
          } else {
            return [];
          }
        } else {
          if (home[category] !== value) {
            return [];
          }
          matchingPairs.push({ [category]: value });
        }
      }
      return matchingPairs;
    };

    if (selected && selected.length > 0) {
      filteredhomes = filteredhomes.filter((home) => {
        const matchingPairs = match_selected(home, selected);
        return matchingPairs.length > 0;
      });
    }

    return filteredhomes.map((home) => (
      <Col
        key={Math.random()}
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={4}
        className="mb-5 mr-5"
      >
        <CardComponent {...home} />
      </Col>
    ));
  };

  const result = filteredhome(homes, selectedCategory, query);

  return (
    <Container fluid>
      <Navbar />

      <div className="body-container">
        <div className="sidebar-container">
          <Sidebar handleChange={handleChange} />
        </div>

        <div className="main-content">
          <div className="search-container">
            <Search query={query} handleInputChange={handleInputChange} />
          </div>
          <div className="custom-margin">
            <Row className="mt-3">{result}</Row>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search_page;
