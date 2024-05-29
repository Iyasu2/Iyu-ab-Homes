import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homes.css";
import program_icon from "../../../assets/icon3.png";

const Homes = () => {
  const navigate = useNavigate();

  return (
    <div className="homes" id="homes">
      <div className="home" onClick={() => navigate("/")}>
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
      <div className="home" onClick={() => navigate("/")}>
        <img
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
      <div className="home" onClick={() => navigate("/")}>
        <img
          src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="caption">
          <img src={program_icon} />
          <p>See more</p>
        </div>
      </div>
    </div>
  );
};

export default Homes;
