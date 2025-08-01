import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard, MdKeyboardArrowDown } from "react-icons/md";
import {
  BsBoxSeam,
  BsCartCheck,
  BsCartPlus,
  BsCart,
  BsExclamationOctagon,
  BsFileEarmarkText,
} from "react-icons/bs";
import { PiBoxArrowDown, PiBoxArrowUp, PiRecycle } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";
import BlueLogoSIP from "../logo/BlueLogoSIP";
import Logout from "../../pages/Auth/Logout";
import { CgBox } from "react-icons/cg";

import { RiBox3Line } from "react-icons/ri";

import { BsBox2 } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

//Menu Sidebar
const menuItems = [
  {
    name: "Produk",
    icon: <BsBoxSeam size={26} />,
    items: [
      {
        name: "Produk",
        path: "/product",
        icon: <CgBox size={19} />,
      },
      {
        name: "Barang Masuk",
        path: "/product-in",
        icon: <PiBoxArrowDown size={20} />,
      },
      {
        name: "Barang Keluar",
        path: "/product-out",
        icon: <PiBoxArrowUp size={20} />,
      },
    ],
  },
  {
    name: "Kadaluarsa",
    icon: <BsExclamationOctagon size={26} />,
    items: [
      {
        name: "Akan Kadaluarsa",
        path: "/product-will-expired",
        icon: <TiWarningOutline size={20} />,
      },
      {
        name: "Sudah Kadaluarsa",
        path: "/product-expired",
        icon: <PiRecycle size={20} />,
      },
    ],
  },
  {
    name: "Pesanan",
    icon: <BsCart size={26} />,
    items: [
      {
        name: "Pesanan Barang",
        path: "/product-order",
        icon: <BsCartPlus size={20} />,
      },
      {
        name: "Pesanan Datang",
        path: "/product-arrived",
        icon: <BsCartCheck size={20} />,
      },
    ],
  },
];

const getActiveMenu = (pathname) => {
  const activeMenu = menuItems.find((menu) =>
    menu.items.some((item) => pathname === item.path)
  );
  return activeMenu ? activeMenu.name : null;
};

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(
    getActiveMenu(location.pathname)
  );

  useEffect(() => {
    setOpenSubmenu(getActiveMenu(location.pathname));
  }, [location.pathname]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const baseLinkStyle =
    "flex items-center pl-4 mt-1 py-2 font-semibold rounded-md transition-colors duration-300";
  const activeLinkStyle = `${baseLinkStyle} bg-indigo-600 text-white`;
  const inactiveLinkStyle = `${baseLinkStyle} text-gray-700 hover:bg-indigo-600 hover:text-white`;

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <div
        className={`transition-all duration-300 bg-white h-full flex flex-col ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex items-center p-4 flex-shrink-0">
          <BlueLogoSIP />
        </div>
        <nav className="mt-2 flex-1 overflow-y-auto px-2">
          {/* Home */}
          <h4 className="px-2 font-semibold text-gray-600">Home</h4>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : inactiveLinkStyle
            }
          >
            <MdOutlineSpaceDashboard size={30} />
            <span className="ml-6 font-medium">Dashboard</span>
          </NavLink>

          {/* Menu Pages */}
          <h4 className="mt-6 px-2 font-semibold text-gray-600">Pages</h4>
          {menuItems.map((menu) => (
            <div key={menu.name} className="mb-4">
              <button
                onClick={() => toggleSubmenu(menu.name)}
                className={`w-full text-left ${inactiveLinkStyle}`}
              >
                {menu.icon}
                <span className="ml-6 font-medium flex-1">{menu.name}</span>
                <MdKeyboardArrowDown
                  className={`transition-transform duration-300 ${
                    openSubmenu === menu.name ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <div
                className={`mt-1 overflow-hidden transition-all duration-300 ${
                  openSubmenu === menu.name ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-8 border-l-2 border-gray-200 ml-4">
                  {menu.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center text-sm py-2 ${
                          isActive
                            ? "text-white bg-indigo-500 rounded-md pl-2"
                            : "text-gray-600 hover:text-indigo-600"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="ml-4">{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Report */}
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : inactiveLinkStyle
            }
          >
            <BsFileEarmarkText size={26} />
            <span className="ml-6 font-medium">Laporan</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`cursor-pointer w-full text-left mt-4 mb-4 ${inactiveLinkStyle}`}
          >
            <FiLogOut size={26} className="pl-0.5" />
            <span className="ml-7 font-medium">Keluar</span>
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
