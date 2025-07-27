import React from "react";
import { Bar } from "react-chartjs-2";
import { barChartData } from "../../data/data";

const BarChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={barChartData} options={options} />;
};

export default BarChart;
