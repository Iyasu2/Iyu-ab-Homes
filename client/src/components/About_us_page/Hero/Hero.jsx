import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import arrow from "../../../assets/dark-arrow.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero hero-container" id="hero">
      <div className="hero-text">
        <h1>Find Your Dream Home for Sale or Rent</h1>
        <p>
          Welcome!! Here you'll discover a curated collection of exceptional
          homes available for sale or rent. Whether you're searching for your
          forever home, a cozy rental, or an investment property, we've got you
          covered.
        </p>
        <button className="btn" onClick={() => navigate("/")}>
          Explore more <img src={arrow} alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
