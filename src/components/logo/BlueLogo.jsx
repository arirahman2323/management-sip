import React from "react";
// Impor logo Anda dari path yang benar
import blue_logo from "../../assets/images/blue_logo.png";

const BlueLogo = () => {
  return (
    <div className="flex items-center">
      <img src={blue_logo} alt="SIP Logo" className="h-20 w-auto" />
      <div>
        <p className="font-semibold text-gray-800 text-sm leading-tight">
          Sistem Informasi
        </p>
        <p className="font-semibold text-gray-800 text-sm leading-tight">
          Pencatatan
        </p>
      </div>
    </div>
  );
};

export default BlueLogo;
