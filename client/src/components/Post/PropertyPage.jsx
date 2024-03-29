// PropertyPage.js
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import PropertyDetailsWithImages from "./PropertyDetailsWithImages";
import Navbar from "../Navbar/Navbar";
import "./propertydetails.css";

const PropertyPage = ({ isAuthenticated }) => {
  const { user } = useAuthContext();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const propertiesData = await response.json();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    fetchProperties();
  }, [user]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <section className="card-container2">
        {properties &&
          properties.map((property) => (
            <PropertyDetailsWithImages key={property.id} property={property} />
          ))}
      </section>
    </>
  );
};

export default PropertyPage;
