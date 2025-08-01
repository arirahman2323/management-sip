import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import BarChart from "../../components/charts/BarChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ProductTable from "../../components/tables/ProductTable";
import {
  productWillExpire,
  productHasExpired,
  productArrived,
  productOrder,
} from "../../data/data";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { BsBoxSeam, BsCartPlus, BsRecycle, BsCartCheck } from "react-icons/bs";
import { PiBoxArrowDown, PiBoxArrowUp } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";

// FIX: Register all the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 min-h-full">
        {/* Main and description */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            System Inventory Product (SIP)
          </h1>
          <button className="flex cursor-pointer items-center pt-2.5 text-gray-400 rounded-sm p-2 bg-white text-sm font-medium hover:bg-white hover:text-black">
            <IoFilterOutline className="item-center pr-1 pb-1" size={26} />
            Filter Tahun
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-4">
          <StatCard
            title="Total Produk"
            value="196"
            icon={<BsBoxSeam className="h-6 w-6 text-cyan-500" />}
            bgColor="bg-white"
            fontColor={"text-cyan-500"}
            gradientColor={"bg-gradient-to-tr from-cyan-400 to-cyan-600"}
          />
          <StatCard
            title="Produk In"
            value="196"
            icon={<PiBoxArrowDown className="h-8 w-8 text-blue-700" />}
            bgColor="bg-white"
            fontColor={"text-blue-700"}
            gradientColor={"bg-gradient-to-tr from-blue-500 to-blue-700"}
          />
          <StatCard
            title="Produk Out"
            value="196"
            icon={<PiBoxArrowUp className="h-8 w-8 text-yellow-600" />}
            bgColor="bg-white"
            fontColor={"text-yellow-500"}
            gradientColor={"bg-gradient-to-tr from-yellow-400 to-yellow-600"}
          />

          <div className="lg:col-span-2 space-y-4">
            {/* Total Nilai Transaksi */}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-around">
              <div className="p-1 rounded-full  bg-gradient-to-tr from-green-400 to-green-600">
                <div className="p-2 rounded-full bg-white">
                  <FaCoins className="text-green-500" size={20} />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xl font-bold text-green-500">
                  Rp. 1.452.000
                </p>
                <p className="text-xs text-gray-500">Total Nilai Transaksi</p>
              </div>
              <FaHandHoldingUsd className=" text-green-500" size={30} />
            </div>
            {/* Total Nilai Profit */}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-around">
              <div className="p-1 rounded-full  bg-gradient-to-tr from-green-400 to-green-600">
                <div className="p-2 rounded-full bg-white">
                  <FaCoins className="text-green-500" size={20} />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xl font-bold text-green-500">
                  Rp. 1.000.000
                </p>
                <p className="text-xs text-gray-500">Total Nilai Profit</p>
              </div>
              <GiProfit className="text-green-500" size={30} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Grafik Barang Masuk dan Barang Keluar
            </h3>
            <BarChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Grafik Total Product</h3>
            <DoughnutChart />
          </div>
        </div>

        {/* Product Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProductTable
            title="Produk akan kadaluarsa"
            subtitle="10 produk akan kadaluarsa"
            products={productWillExpire}
            icon={<TiWarningOutline className="h-8 w-8 text-yellow-500" />}
            detail="/product-will-expired"
            radiusColor={"bg-yellow-400"}
          />
          <ProductTable
            title="Produk kadaluarsa"
            subtitle="15 produk kadaluarsa"
            products={productHasExpired}
            icon={<BsRecycle className="h-6 w-6 text-red-500" />}
            detail="/product-expired"
            radiusColor={"bg-red-400"}
          />
          <ProductTable
            title="Barang dipesan"
            subtitle="20 produk dipesan"
            products={productOrder}
            icon={<BsCartPlus className="h-6 w-6 text-blue-500" />}
            detail="/product-order"
            radiusColor={"bg-cyan-500"}
          />
          <ProductTable
            title="Barang sampai"
            subtitle="20 produk sampai"
            products={productArrived}
            icon={<BsCartCheck className="h-6 w-6 text-green-500" />}
            detail="/product-arrived"
            radiusColor={"bg-green-400"}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
