import React from "react";
import Avatar from "../../assets/images/bgwhite_logo.png";
import { FaArrowCircleLeft } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white border-indigo-600">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <FaArrowCircleLeft className="h-7 w-7 text-indigo-600 cursor-pointer hover:text-indigo-900" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="relative flex items-center">
          <span className="mr-4 font-semibold">Fahmi Ari Rahman</span>
          <img
            src={Avatar}
            alt="Avatar"
            className="h-10 w-10 rounded-full object-cover border-2 border-black"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
