import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Search_page/Sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "./components/Search_page/Card";
import "./Search_page.css";
import Search from "./components/Search_page/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const Search_page = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSidebarMin, setShowSidebarMin] = useState(false);

  // Function to update sidebar visibility based on screen width
  const handleResize = () => {
    if (!showSidebarMin && window.innerWidth <= 768) {
      setShowSidebar(false); // Hide sidebar on smaller screens
    } else if (window.innerWidth > 768) {
      setShowSidebar(true); // Show sidebar on larger screens
      setShowSidebarMin(false);
    }
  };

  useEffect(() => {
    handleResize(); // Set initial sidebar visibility

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://iyu-ab-homes.vercel.app/api/properties/public",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const propertiesFromDatabase = await response.json();
        setProperties(propertiesFromDatabase);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log properties state variable after it is fetched
    console.log(properties);
  }, [properties]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = properties.filter(
    (property) =>
      property.type.toLowerCase().includes(query.toLowerCase()) ||
      property.city.toLowerCase().includes(query.toLowerCase()) ||
      property.state.toLowerCase().includes(query.toLowerCase()) ||
      property.accommodation.toLowerCase().includes(query.toLowerCase()) ||
      property.town.toLowerCase().includes(query.toLowerCase()) ||
      property.price.toString().toLowerCase().includes(query.toLowerCase()) ||
      property.floors.toLowerCase().includes(query.toLowerCase()) ||
      property.totalArea.toLowerCase().includes(query.toLowerCase()) ||
      property.builtInArea.toLowerCase().includes(query.toLowerCase())
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

  const filteredProperty = (properties, selected, query) => {
    let filteredProperties = properties;

    if (query) {
      filteredProperties = filteredItems;
    }

    const matchSelected = (property, selected) => {
      const matchingPairs = [];
      for (const { category, value } of selected) {
        if (category === "All") {
          return matchingPairs;
        }
        if (category === "price") {
          const [min, max] = value.split("-").map(Number);
          if (property[category] > min && property[category] <= max) {
            matchingPairs.push({ [category]: value });
          } else {
            return [];
          }
        } else {
          if (property[category] !== value) {
            return [];
          }
          matchingPairs.push({ [category]: value });
        }
      }
      return matchingPairs;
    };

    if (selected && selected.length > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        const matchingPairs = matchSelected(property, selected);
        return matchingPairs.length > 0;
      });
    }

    return filteredProperties.map((property) => {
      // Check if the property object has an id property
      if (!property.hasOwnProperty("id")) {
        console.error("Property ID is missing:", property);
        return null; // Return null to skip rendering this property
      }

      return (
        <Col
          key={Math.random()}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={4}
          className="mb-5 mr-5"
        >
          <CardComponent
            id={property.id}
            userId={property.userId}
            images={property.images}
            type={property.type}
            totalArea={property.totalArea}
            builtInArea={property.builtInArea}
            state={property.state}
            city={property.city}
            town={property.town}
            floors={property.floors}
            accommodation={property.accommodation}
            price={property.price}
            views={property.views}
          />
        </Col>
      );
    });
  };

  const result = filteredProperty(properties, selectedCategory, query);

  return (
    <>
      <Navbar />

      <Container fluid>
        <div className={`body-container ${showSidebar ? "show-sidebar" : ""}`}>
          {/* Sidebar */}
          {showSidebar || showSidebarMin ? (
            <div className="sidebar-container">
              <Sidebar handleChange={handleChange} />
            </div>
          ) : null}
          {/* Toggle button for sidebar */}
          {!showSidebar && (
            <button
              className="sidebar-toggle-button"
              onClick={() => setShowSidebarMin(true)}
              data-tooltip="Filter"
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          )}

          {/* Toggle button to hide sidebar */}
          {showSidebarMin && (
            <button
              className="sidebar-toggle-button"
              onClick={() => setShowSidebarMin(false)}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          )}
          {/* Main Content */}

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
    </>
  );
};

export default Search_page;
