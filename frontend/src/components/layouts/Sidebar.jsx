import React from "react";
import { Link } from "react-router-dom";
import BlueLogo from "../logo/BlueLogo";
import { FaBoxOpen } from "react-icons/fa";
import { PiBoxArrowDownFill } from "react-icons/pi";
import { PiBoxArrowUpFill } from "react-icons/pi";
import { FaRegFileAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`transition-all duration-300 bg-white h-full flex flex-col text-indigo-600 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      {/* Logo */}
      <div className="flex items-center p-4 flex-shrink-0">
        <BlueLogo />
      </div>

      {/* Menu */}
      <nav className="mt-2 flex-1 overflow-y-auto">
        {/* Home */}
        <h4 className="px-6 font-semibold text-gray-600">Home</h4>
        <Link
          to="/dashboard"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-500 hover:text-white rounded-xl"
        >
          <MdDashboard size={24} />
          <span className="mx-4 font-medium">Dashboard</span>
        </Link>

        {/* Pages */}
        <h4 className="mt-6 px-6 font-semibold text-gray-600">Pages</h4>
        {/* Product */}
        <Link
          to="/product"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <FaBoxOpen size={24} />
          <span className="mx-4 font-medium">Produk</span>
        </Link>
        {/* Product In */}
        <Link
          to="/product-in"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowDownFill size={24} />
          <span className="mx-4 font-medium">Barang Masuk</span>
        </Link>
        {/* Product out */}
        <Link
          to="/product-out"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowUpFill size={24} />
          <span className="mx-4 font-medium">Barang Keluar</span>
        </Link>
        {/* Product Will Expired */}
        <Link
          to="/product-will-expired"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowUpFill size={24} />
          <span className="mx-4 font-medium">Barang mau Kadaluarsa</span>
        </Link>
        {/* Product Expired */}
        <Link
          to="/product-expired"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowUpFill size={24} />
          <span className="mx-4 font-medium">Barang Kadaluarsa</span>
        </Link>
        {/* Product Order */}
        <Link
          to="/product-order"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowUpFill size={24} />
          <span className="mx-4 font-medium">Pesanan Barang</span>
        </Link>
        {/* Product Arrived */}
        <Link
          to="/product-out"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <PiBoxArrowUpFill size={24} />
          <span className="mx-4 font-medium">Barang Tiba</span>
        </Link>
        {/* Laporan */}
        <Link
          to="/report"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <FaRegFileAlt size={24} />
          <span className="mx-4 font-medium">Laporan</span>
        </Link>
        {/* Logout */}
        <Link
          to="/logout"
          className="flex items-center mt-4 py-2 px-6 font-semibold text-black hover:bg-indigo-600 hover:text-white"
        >
          <FiLogOut size={24} />
          <span className="mx-4 font-medium">Keluar</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
