import React from "react";
// Impor logo Anda dari path yang benar
import blue_logo from "../../assets/images/blue_logo.png";

const BlueLogoSIP = () => {
  return (
    <div className="flex items-center">
      <img src={blue_logo} alt="SIP Logo" className="h-20 w-auto" />
      <p className="  text-black text-2xl leading-tight">SIP</p>
    </div>
  );
};

export default BlueLogoSIP;
