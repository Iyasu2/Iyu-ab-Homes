import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faBed,
  faMoneyBillAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { usePropertiesContext } from "../../hooks/usePropertiesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const PropertyDetails = ({ property }) => {
  const navigate = useNavigate();
  const { dispatch } = usePropertiesContext();
  const { user } = useAuthContext();

  const handleCardClick = () => {
    navigate("/details", {
      state: {
        property,
      },
    });
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/properties/${property._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PROPERTY", payload: json });
    }
  };

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price).replace(/\.00$/, "") + " Birr";
  };

  return (
    <div className="property-details card-post" onClick={handleCardClick}>
      <Card className="h-100">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: 5,
                color: "#fff",
                marginRight: 8,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <FontAwesomeIcon icon={faBed} style={{ marginRight: 5 }} />
              <strong>For:</strong> {property.accommodation}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: 5 }} />
              <span>1234</span>
            </div>
          </div>
          <div
            style={{
              paddingBottom: "56%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Card.Img
              variant="top"
              src={property.images[0]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <Card.Body>
          <div className="description-area content">
            <div className="dark-bg"></div>
            <div className="content">
              <h4>{property.type}</h4>
              <p>
                <strong>Total Area: </strong>
                {property.totalArea}
              </p>
              <p>
                <strong>Built-in Area: </strong>
                {property.builtInArea}
              </p>
              <p>
                <strong>State: </strong>
                {property.state}
              </p>
              <p>
                <strong>City: </strong>
                {property.city}
              </p>
              <p>
                <strong>Town: </strong>
                {property.town}
              </p>
              <p>
                <strong>Floors: </strong>
                {property.floors}
              </p>
              <p>
                <strong>Bedrooms: </strong>
                {property.bedrooms}
              </p>
              <p>
                <strong>Bathrooms: </strong>
                {property.bathrooms}
              </p>
              <p>
                <strong>Views: </strong>
                {property.views}
              </p>
              <p>
                <strong>Accommodation: </strong>
                {property.accommodation}
              </p>
              <span className="material-symbols-outlined" onClick={handleClick}>
                delete
              </span>
              <br />
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default PropertyDetails;
