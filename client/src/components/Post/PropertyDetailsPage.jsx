import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileInformation from "../Dashboard/ProfileInformation";
import placeholderImage from "../../assets/placeholder-image.png"; // Import placeholder image

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:5000/api/properties/${id}`);
        const userResponse = await fetch(`http://localhost:5000/api/user`);

        if (propertyResponse.ok && userResponse.ok) {
          const propertyData = await propertyResponse.json();
          const userData = await userResponse.json();
          setProperty(propertyData);
          setUser(userData);
          setLoading(false);
        } else {
          console.error("Failed to fetch property details or user data");
        }
      } catch (error) {
        console.error("Error fetching property details or user data:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details-container">
      <div className="property-details">
        <h2>Property Details</h2>
        {property && (
          <div>
            <p>Type: {property.type}</p>
            {/* Include other property details */}
          </div>
        )}
      </div>
      <div className="profile-details">
        <h2>Profile Information</h2>
        {user && <ProfileInformation user={user} />}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
