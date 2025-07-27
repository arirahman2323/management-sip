import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlueLogo from "../logo/BlueLogo";
import { FaRegFileAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logout from "../../pages/Auth/Logout";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiBoxArrowDown } from "react-icons/pi";
import { PiBoxArrowUp } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import { PiRecycle } from "react-icons/pi";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";

const Sidebar = ({ isOpen }) => {
  const linkItemStyle =
    "flex items-center pl-4 mt-4 py-2 font-semibold text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-colors duration-300";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const openConfirmModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
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
          <Link to="/dashboard" className={linkItemStyle}>
            <MdOutlineSpaceDashboard size={24} />
            <span className="ml-6 font-medium">Dashboard</span>
          </Link>

          {/* Pages */}
          <h4 className="mt-6 px-6 font-semibold text-gray-600">Pages</h4>
          {/* Product */}
          <Link to="/product" className={linkItemStyle}>
            <BsBoxSeam size={22} />
            <span className="ml-6 font-medium">Produk</span>
          </Link>
          {/* Product In */}
          <Link to="/product-in" className={linkItemStyle}>
            <PiBoxArrowDown size={24} />
            <span className="ml-6 font-medium">Barang Masuk</span>
          </Link>
          {/* Product out */}
          <Link to="/product-out" className={linkItemStyle}>
            <PiBoxArrowUp size={24} />
            <span className="ml-6 font-medium">Barang Keluar</span>
          </Link>
          {/* Product Will Expired */}
          <Link to="/product-will-expired" className={linkItemStyle}>
            <TiWarningOutline size={24} />
            <span className="ml-6 font-medium">Barang Akan Kadaluarsa</span>
          </Link>
          {/* Product Expired */}
          <Link to="/product-expired" className={linkItemStyle}>
            <PiRecycle size={24} />
            <span className="ml-6 font-medium">Barang Kadaluarsa</span>
          </Link>
          {/* Product Order */}
          <Link to="/product-order" className={linkItemStyle}>
            <BsCartPlus size={24} />
            <span className="ml-6 font-medium">Pesanan Barang</span>
          </Link>
          {/* Product Arrived */}
          <Link to="/product-arrived" className={linkItemStyle}>
            <BsCartCheck size={24} />
            <span className="ml-6 font-medium">Pesanan Datang</span>
          </Link>
          {/* Laporan */}
          <Link to="/report" className={linkItemStyle}>
            <FaRegFileAlt size={24} />
            <span className="ml-6 font-medium">Laporan</span>
          </Link>
          {/* Logout */}
          <button
            onClick={openConfirmModal}
            className="cursor-pointer flex items-center w-full text-left mt-4 pl-4 py-2 mb-4 font-semibold text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-colors duration-300"
          >
            <FiLogOut className="h-6 w-6" />
            <span className="ml-6 font-medium">Keluar</span>
          </button>
        </nav>
      </div>
      <Logout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
