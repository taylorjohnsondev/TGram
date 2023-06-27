import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tgram.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="logo-container">
        <img className="logo" src={logo} alt="TGram" />
      </div>
    </Link>
  );
};

export default Logo;
