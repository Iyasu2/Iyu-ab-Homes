import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/About_us_page/Hero/Hero";
import Homes from "./components/About_us_page/Homes/Homes";
import Title from "./components/About_us_page/Title/Title";
import About from "./components/About_us_page/About/About";
import Contact from "./components/About_us_page/Contact/Contact";
import Footer from "./components/About_us_page/Footer/Footer";

const About_us_page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <Title subTitle="Our Program" title="What we offer" />
        <Homes />
        <About />
        <Title subTitle="Contact Us" title="Get in Touch" />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default About_us_page;
