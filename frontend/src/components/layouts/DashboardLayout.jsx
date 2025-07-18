import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import bg from "../../assets/images/GraphicSlide.png";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="relative flex-1 overflow-y-auto bg-gray-100">
          <div className="absolute top-0 left-0 w-full h-48">
            <img
              src={bg}
              alt="Latar Belakang"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
