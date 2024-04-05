import React from "react";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faMoneyBillAlt,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, userData } = location.state;

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
    <>
      <div className="details-container">
        <div className="details">
          <div className="big-img">
            <img src={property.images} alt="" />
          </div>

          <div className="box">
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
            <br />
            <br />
            <br />
            <div className="row">
              <h1>Poster's Information</h1>
            </div>
            <div className="description-area content">
              <div className="dark-bg"></div>
              <div className="content">
                {userData.fullName && (
                  <>
                    <FontAwesomeIcon icon={faUser} /> <strong>Type:</strong>{" "}
                    {userData.fullName}
                    <br />
                  </>
                )}
                {userData.phoneNumber && (
                  <>
                    <FontAwesomeIcon icon={faPhone} /> <strong>Area:</strong>{" "}
                    {userData.phoneNumber}
                    <br />
                  </>
                )}
                {userData.telegram && (
                  <>
                    <strong>Telegram:</strong> {userData.telegram}
                    <br />
                  </>
                )}
                {userData.whatsapp && (
                  <>
                    <strong>Whatsapp:</strong> {userData.whatsapp}
                    <br />
                  </>
                )}
                {userData.facebook && (
                  <>
                    <strong>Facebook:</strong> {userData.facebook}
                    <br />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
