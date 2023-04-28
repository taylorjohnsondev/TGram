import React from "react";
 
const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo" src={require("client/public/tgram.png")} alt="TGram"/>
    </div>
  );
};

export default Logo;
