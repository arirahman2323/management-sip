import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  bgColor,
  fontColor,
  gradientColor,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
      <div className={`p-1 rounded-full mr-4 ${gradientColor}`}>
        {/* 3. Div ikon asli sekarang ada di dalamnya */}
        <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      </div>
      <div>
        <h1 className="text-gray-500 text-xl">{title}</h1>
        <p className={`text-3xl font-bold ${fontColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
