import React from "react";
import { Doughnut } from "react-chartjs-2";
import { doughnutChartData } from "../../data/data";

const DoughnutChart = ({ data }) => {
  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
