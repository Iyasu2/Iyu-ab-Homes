import React from "react";
import "./Homes.css";
import home_1 from "../../../assets/program-1.png";
import home_2 from "../../../assets/program-2.png";
import home_3 from "../../../assets/program-3.png";
import program_icon from "../../../assets/icon3.png";

const Homes = () => {
  return (
    <div className="homes" id="homes">
      <div className="home">
        <img src={home_1} alt="" />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
      <div className="home">
        <img src={home_2} alt="" />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
      <div className="home">
        <img src={home_3} alt="" />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
    </div>
  );
};

export default Homes;
