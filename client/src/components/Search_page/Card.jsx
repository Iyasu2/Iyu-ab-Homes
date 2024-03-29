import { React, useState } from "react";
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
import { useNavigate } from "react-router-dom"; // Import useHistory
import "./Card.css";

const CardComponent = ({
  images,
  type,
  totalArea,
  builtInArea,
  state,
  city,
  Town,
  floors,
  accommodation,
  price,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/details", {
      state: {
        images,
        type,
        totalArea,
        builtInArea,
        state,
        city,
        Town,
        floors,
        accommodation,
        price,
      },
    });
  };

  const [saleSelected, setSaleSelected] = useState(false);

  const formatprice = (price) => {
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
    <div className="card " /*onClick={handleCardClick}*/>
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
              <strong>For:</strong> {accommodation}
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
              src={images ? images : null}
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
              <FontAwesomeIcon icon={faBuilding} /> <strong>type:</strong>{" "}
              {type}
              <br />
              <FontAwesomeIcon icon={faHome} /> <strong>Area:</strong>{" "}
              {totalArea} / {builtInArea}
              <br />
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              <strong>Location:</strong> {Town}, {city}, {state}
              <br />
              <strong>floors:</strong> {floors}
              <br />
              <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>price:</strong>{" "}
              {formatprice(price)}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
