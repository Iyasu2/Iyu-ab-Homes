import React from "react";
import "./About.css";
import about_img from "../../../assets/about.png";
import play_icon from "../../../assets/play-icon.png";

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about-left">
        <img src={about_img} className="about-img" />
        <img src={play_icon} className="play-icon" />
      </div>
      <div className="about-right">
        <h3>ABOUT US</h3>
        <h2>Find Your Dream Home for Sale or Rent</h2>
        <p>
          Welcome to Iyu-ab Homes! We're here to simplify your home search and
          property transactions. With our expertise and user-friendly platform,
          finding the perfect home for sale or rent is a breeze. Whether you're
          a first-time buyer, seasoned investor, or seeking a cozy rental, our
          comprehensive listings cater to your unique needs. Trust us to guide
          you every step of the way, backed by years of experience in the real
          estate industry.
        </p>
        <p>
          At Iyu-ab Homes, your satisfaction is our priority. Our platform
          offers a diverse range of properties, from luxurious estates to
          affordable starter homes, in various neighborhoods and cities. With
          advanced search filters and an intuitive interface, finding your
          perfect home is easy. We provide valuable resources and tools for
          informed decision-making throughout the process.
        </p>
        <p>
          Your privacy and security are our top priorities. We handle your
          personal information with utmost confidentiality and comply with
          privacy regulations. Our dedicated support team is always available to
          assist you. We build strong client relationships and provide guidance
          to navigate the real estate market. Start your journey with us today
          and let us help you find your dream home or list your property for
          sale or rent.
        </p>
      </div>
    </div>
  );
};

export default About;
