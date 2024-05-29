import React, { useState } from "react";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faTrash,
  faMoneyBillAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Details = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state;
  const [index, setIndex] = useState(0);

  const formatPrice = (price) => {
    // Format the price with commas, two decimal places, and "Birr"
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Format the price and remove the decimal part if it equals .00
    return formatter.format(price).replace(/\.00$/, "") + " Birr";
  };

  const handleEdit = () => {
    // Navigate to the edit page with the property details
    navigate("/edit-property", { state: { property } });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/${property.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      console.log("Property deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting property:", error.message);
      // Optionally, you can display an error message to the user
    }
  };

  const handleTab = (index) => {
    setIndex(index);
  };

  return (
    <>
      <div className="details-container">
        <div className="details">
          <div className="big-img">
            <img src={property.images[index]} alt="" />
          </div>

          <div className="box">
            <div className="thumb">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  onClick={() => handleTab(index)}
                />
              ))}
            </div>
            <div className="row">
              <h2>{property.type}</h2>
              <span>{property.accommodation}</span>
            </div>

            <div className="description-area content">
              <div className="dark-bg"></div>
              <div className="content">
                <FontAwesomeIcon icon={faBuilding} /> <strong>Type:</strong>{" "}
                {property.type}
                <br />
                <FontAwesomeIcon icon={faHome} /> <strong>Area:</strong>{" "}
                {property.totalArea} / {property.builtInArea}
                <br />
                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                <strong>Location:</strong> {property.town}, {property.city},{" "}
                {property.state}
                <br />
                <strong>Floors:</strong> {property.floors}
                <br />
                <FontAwesomeIcon icon={faMoneyBillAlt} />{" "}
                <strong>Price:</strong> {formatPrice(property.price)}
              </div>
            </div>

            <div className="buttons">
              <button className="edit" onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button className="delete" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
