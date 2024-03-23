import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faBed,
  faMoneyBillAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import homes from "./components/Search_page/db/data";
import CardComponent from "./components/Search_page/Card";
import "./Search_page.css";
import Search from "./components/Search_page/Search/Search";

const Search_page = ({ isAuthenticated }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = homes.filter(
    (home) =>
      home.Type.toLowerCase().includes(query.toLowerCase()) ||
      home.City.toLowerCase().includes(query.toLowerCase()) ||
      home.State.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event, category) => {
    const selectedValue = event.target.value;

    setSelectedCategory((prevSelectedCategory) => {
      if (selectedValue === "All") {
        return prevSelectedCategory.filter(
          (item) => item.category !== category
        );
      }

      const index = prevSelectedCategory.findIndex(
        (item) => item.category === category
      );

      if (index !== -1) {
        return prevSelectedCategory.map((item, i) =>
          i === index ? { category, value: selectedValue } : item
        );
      }

      return [...prevSelectedCategory, { category, value: selectedValue }];
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
        if (category === "Price") {
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
      <Navbar isAuthenticated={isAuthenticated} />

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
