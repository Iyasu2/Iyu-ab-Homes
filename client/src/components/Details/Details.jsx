import React from "react";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faBed,
  faMoneyBillAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Details = () => {
  const location = useLocation();
  const { state } = location;

  const {
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
  } = state;

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
            <img src={img} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{Type}</h2>
              <span>{Accommodation}</span>
            </div>

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

            <button className="cart">Like</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
