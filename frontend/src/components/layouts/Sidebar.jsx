import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { BsBoxSeam, BsCartCheck, BsCartPlus, BsExclamationOctagon, BsFileEarmarkText, BsCart, BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { PiRecycle } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import BlueLogoSIP from "../logo/BlueLogoSIP";
import Logout from "../../pages/Auth/Logout";

// 1. Pusat data untuk semua menu (Sumber Kebenaran Tunggal)
const menuConfig = [
  { type: "header", name: "Home" },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineSpaceDashboard size={24} />,
  },
  { type: "header", name: "Pages" },
  { name: "Produk", path: "/product", icon: <BsBoxSeam size={22} /> },
  {
    name: "Barang Masuk",
    path: "/product-in",
    icon: <BsArrowDownSquare size={20} />,
  },
  {
    name: "Barang Keluar",
    path: "/product-out",
    icon: <BsArrowUpSquare size={20} />,
  },
  // {
  //   name: "Kadaluarsa",
  //   icon: <BsExclamationOctagon size={20} />,
  //   items: [
  //     {
  //       name: "Akan Kadaluarsa",
  //       path: "/product-will-expired",
  //       icon: <TiWarningOutline size={20} />,
  //     },
  //     {
  //       name: "Sudah Kadaluarsa",
  //       path: "/product-expired",
  //       icon: <PiRecycle size={20} />,
  //     },
  //   ],
  // },
  // {
  //   name: "Pesanan",
  //   icon: <BsCart size={20} />,
  //   items: [
  //     {
  //       name: "Pesanan Barang",
  //       path: "/product-order",
  //       icon: <BsCartPlus size={20} />,
  //     },
  //     {
  //       name: "Pesanan Datang",
  //       path: "/product-arrived",
  //       icon: <BsCartCheck size={20} />,
  //     },
  //   ],
  // },
  { name: "Laporan", path: "/report", icon: <BsFileEarmarkText size={20} /> },
];

// Helper function untuk mencari menu aktif
const getActiveMenu = (pathname) => {
  for (const menu of menuConfig) {
    if (menu.items && menu.items.some((item) => pathname === item.path)) {
      return menu.name;
    }
  }
  return null;
};

const Sidebar = ({ isOpen, toggle, onLogoutClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(getActiveMenu(location.pathname));

  useEffect(() => {
    setOpenSubmenu(getActiveMenu(location.pathname));
  }, [location.pathname]);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  // const handleLogout = () => {
  //   setIsModalOpen(false);
  //   navigate("/");
  // };

  // Definisi Style
  const linkStyle = "flex items-center pl-3 py-2 font-semibold rounded-md transition-colors duration-200";
  const activeLinkStyle = `${linkStyle} bg-indigo-600 text-white`;
  const inactiveLinkStyle = `${linkStyle} text-gray-700 hover:bg-indigo-600 hover:text-white`;

  // Komponen pembungkus untuk merapikan ikon
  const IconWrapper = ({ children }) => <div className="w-8 h-8 flex items-center justify-center">{children}</div>;

  return (
    <>
      <div className={`transition-all duration-300 bg-white h-full flex flex-col ${isOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <BlueLogoSIP />
        <nav className="mt-1 flex-1 overflow-y-auto px-2">
          {/* 2. Render semua menu secara dinamis dari 'menuConfig' */}
          {menuConfig.map((menu, index) => {
            // Render Header (e.g., "Home", "Pages")
            if (menu.type === "header") {
              return (
                <h4 key={index} className={`px-2 font-semibold text-gray-500 text-sm ${index > 0 ? "mt-4" : ""}`}>
                  {menu.name}
                </h4>
              );
            }

            // Render Menu dengan Submenu
            if (menu.items) {
              return (
                <div key={menu.name}>
                  <button onClick={() => toggleSubmenu(menu.name)} className={`w-full text-left mt-1 ${inactiveLinkStyle}`}>
                    <IconWrapper>{menu.icon}</IconWrapper>
                    <span className="ml-2 font-medium flex-1">{menu.name}</span>
                    <MdKeyboardArrowDown className={`transition-transform duration-300 mr-2 ${openSubmenu === menu.name ? "rotate-180" : ""}`} size={20} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSubmenu === menu.name ? "max-h-96" : "max-h-0"}`}>
                    <div className="pl-8 border-l-2 border-gray-200 ml-5 my-1">
                      {menu.items.map((item) => (
                        <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center text-sm py-2 pl-2 rounded-md ${isActive ? "text-white bg-indigo-400" : "text-gray-600 hover:text-indigo-600"}`}>
                          <IconWrapper>{item.icon}</IconWrapper>
                          <span className="ml-2">{item.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Render Menu Biasa (tanpa submenu)
            return (
              <NavLink key={menu.path} to={menu.path} className={({ isActive }) => `${isActive ? activeLinkStyle : inactiveLinkStyle} mt-1`}>
                <IconWrapper>{menu.icon}</IconWrapper>
                <span className="ml-2 font-medium">{menu.name}</span>
              </NavLink>
            );
          })}

          {/* Tombol Logout */}
          <button onClick={onLogoutClick} className={`cursor-pointer w-full text-left mt-2 mb-4 ${inactiveLinkStyle}`}>
            <IconWrapper>
              <FiLogOut size={20} />
            </IconWrapper>
            <span className="ml-2 font-medium">Keluar</span>
          </button>
        </nav>
      </div>
      {/* <Logout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleLogout} /> */}
    </>
  );
};

export default Sidebar;
