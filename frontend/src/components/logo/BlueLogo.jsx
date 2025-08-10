import React from "react";
// Impor logo Anda dari path yang benar
import blue_logo from "../../assets/images/blue_logo.png";

const BlueLogo = () => {
  return (
    <div className="flex items-center">
      <img src={blue_logo} alt="SIP Logo" className="h-30 w-auto" />
    </div>
  );
};

export default BlueLogo;
