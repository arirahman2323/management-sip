import React from "react";
import BgAuth from "../../assets/images/BgAuth.png";

const AuthLayout = ({ children, imageSide = "left" }) => {
  const imageColumn = (
    <div className="hidden lg:block lg:w-1/2">
      <img
        src={BgAuth}
        alt="Authentication"
        className="w-full h-screen object-cover"
      />
    </div>
  );

  const formColumn = (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
      {children}
    </div>
  );

  return (
    <div
      className={`flex min-h-screen ${
        imageSide === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {imageColumn}
      {formColumn}
    </div>
  );
};

export default AuthLayout;
