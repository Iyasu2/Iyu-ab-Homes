import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faBed,
  faMoneyBillAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({
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
}) => {
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

  return (
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
            <strong>For:</strong> {Accommodation}
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
            src={img}
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
            <FontAwesomeIcon icon={faBuilding} /> <strong>Type:</strong>{" "}
            {Type}
            <br />
            <FontAwesomeIcon icon={faHome} /> <strong>Area:</strong>{" "}
            {Total_Area} / {Built_in_Area}
            <br />
            <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
            <strong>Location:</strong> {Town}, {City}, {State}
            <br />
            <strong>Floors:</strong> {Floors}
            <br />
            <FontAwesomeIcon icon={faMoneyBillAlt} />{" "}
            <strong>Price:</strong> {formatPrice(Price)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
