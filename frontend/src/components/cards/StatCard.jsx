import React from "react";

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className={`p-4 rounded-full mr-2 ${bgColor}`}>{icon}</div>
      <div>
        <h1 className="text-gray-500 text-xl">{title}</h1>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
