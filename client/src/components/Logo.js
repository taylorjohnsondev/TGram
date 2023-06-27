import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="logo-container">
        <img
          className="logo"
          src={require("client/public/tgram.png")}
          alt="TGram"
        />
      </div>
    </Link>
  );
};

export default Logo;
