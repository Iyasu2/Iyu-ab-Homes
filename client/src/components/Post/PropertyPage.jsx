import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import PropertyDetailsWithImages from "./PropertyDetailsWithImages";
import { Row, Col } from "react-bootstrap"; // Import Row and Col components


const PropertyPage = ({ isAuthenticated }) => {
  const { user } = useAuthContext();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties/all",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
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
      <div>
        {/* Use Bootstrap's grid system to display cards in three rows */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {" "}
          {/* Add the gutter prop to add space between columns */}
          {properties &&
            properties.map((property) => (
              <Col key={property.id}>
                <PropertyDetailsWithImages property={property} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default PropertyPage;
