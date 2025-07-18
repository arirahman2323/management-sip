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
import { productWillExpire, productHasExpired } from "../../data/data";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { GrStatusWarning } from "react-icons/gr";

import {
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

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
          <h1 className="text-2xl font-bold text-white">
            Sistem Informasi Persediaan (SIP)
          </h1>
          <button className="flex cursor-pointer items-center pt-2.5 text-white rounded-xl p-2 bg-indigo-700 text-sm font-medium hover:bg-white hover:text-indigo-700">
            <IoFilterOutline className="item-center pr-1 pb-1" size={20} />
            Filter Tahun
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <StatCard
            title="Total Produk"
            value="196"
            icon={<ArchiveBoxIcon className="h-6 w-6 text-blue-500" />}
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Produk In"
            value="196"
            icon={<ArrowDownTrayIcon className="h-6 w-6 text-green-500" />}
            bgColor="bg-green-100"
          />
          <StatCard
            title="Produk Out"
            value="196"
            icon={<ArrowUpTrayIcon className="h-6 w-6 text-orange-500" />}
            bgColor="bg-orange-100"
          />

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FaCoins className="h-6 w-6 text-green-500" />
              <div className="ml-4">
                <p className="text-xl font-bold text-green-500">
                  Rp. 1.452.000
                </p>
                <p className="text-xs text-gray-500">Total Nilai Transaksi</p>
              </div>
              <div className="bg-green-100 p-2 rounded-md ml-auto">
                <FaHandHoldingUsd className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FaCoins className="h-6 w-6 text-green-500" />
              <div className="ml-4">
                <p className="text-xl font-bold text-green-500">
                  Rp. 1.000.000
                </p>
                <p className="text-xs text-gray-500">Total Nilai Profit</p>
              </div>
              <div className="bg-green-100 p-2 rounded-md ml-auto">
                <GiProfit className="h-6 w-6 text-green-500" />
              </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductTable
            title="Product Will Expired"
            subtitle="10 product will expired"
            products={productWillExpire}
            icon={<GrStatusWarning />}
          />
          <ProductTable
            title="Product Expired"
            subtitle="15 product has expired"
            products={productHasExpired}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
