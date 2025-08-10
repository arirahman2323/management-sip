import React from "react";

const StatCard = ({ title, value, icon, bgColor, fontColor, gradientColor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-1">
      <div className={`h-17 w-17 rounded-full flex items-center justify-center p-1 ${gradientColor}`}>
        <div className={`h-14 w-14 rounded-full flex items-center justify-center ${bgColor}`}>{icon}</div>
      </div>

      <h1 className="text-gray-500 text-base text-center font-medium">{title}</h1>
      <p className={`text-3xl text-center font-bold ${fontColor}`}>{value}</p>
    </div>
  );
};

export default StatCard;
