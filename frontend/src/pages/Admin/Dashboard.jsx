import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import BarChart from "../../components/charts/BarChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ProductTable from "../../components/tables/ProductTable";
import { productWillExpire, productHasExpired, productArrived, productOrder } from "../../data/data";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { BsBoxSeam, BsCartPlus, BsRecycle, BsCartCheck, BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { PiBoxArrowDown, PiBoxArrowUp } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { NotificationContext } from "../../context/NotificationContext";
import toast from "react-hot-toast";
import NotificationModal from "../../components/NotificationModal";
import { PiRecycle } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";

// FIX: Register all the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka || 0);
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [expiringSoonProducts, setExpiringSoonProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ lowStock: 0, expiringSoon: 0 });

  useEffect(() => {
    if (notifications) {
      const { lowStockCount, expiringSoonCount, expiringSoonList } = notifications;

      if (lowStockCount > 0 || expiringSoonCount > 0) {
        setModalContent({
          lowStock: lowStockCount,
          expiringSoon: expiringSoonCount,
        });
        setIsNotificationModalOpen(true);
      }

      const formattedExpiringSoon = (expiringSoonList || []).map((item) => ({
        name: item.product_name,
        stock: item.quantity,
        date: item.expired_date,
        item_name: item.item_name,
      }));
      setExpiringSoonProducts(formattedExpiringSoon);

      setNotifications(null);
    }
  }, [notifications, setNotifications]);

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      setIsLoading(true);
      try {
        const [dashboardRes, expiredRes, masterProductRes] = await Promise.all([
          axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD(selectedYear)),
          axiosInstance.get(API_PATHS.PRODUCT_EXPIRED.GET_PRODUCT_EXPIRED),
          axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCT),
        ]);

        setDashboardData(dashboardRes.data);

        const masterProductList = masterProductRes.data?.data || [];
        const productMap = new Map(masterProductList.map((p) => [p.id, p]));

        if (!notifications) {
          const expiringSoonList = expiredRes.data?.expiring_soon || [];
          const formattedExpiringSoon = expiringSoonList.map((item) => ({
            name: item.product_name,
            stock: item.quantity,
            date: item.expired_date,
            item_name: item.item_name,
          }));
          setExpiringSoonProducts(formattedExpiringSoon);
        }

        const expiredList = expiredRes.data?.expired || [];
        const formattedExpired = expiredList.map((item) => {
          const productDetails = productMap.get(item.product_id);
          return {
            name: productDetails?.name || `ID: ${item.product_id}`,
            stock: item.quantity,
            date: item.expired_date,
            item_name: item.item_name,
          };
        });
        setExpiredProducts(formattedExpired);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        setDashboardData(null);
        setExpiringSoonProducts([]);
        setExpiredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDashboardData();
  }, [selectedYear]);

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const barChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Produk Masuk",
        data: monthLabels.map((_, index) => {
          const monthData = (dashboardData?.product_in?.monthly || []).find((m) => parseInt(m.month, 10) === index + 1);
          return monthData ? monthData.total_quantity : 0;
        }),
        backgroundColor: "#3A57E8",
      },
      {
        label: "Produk Keluar",
        data: monthLabels.map((_, index) => {
          const monthData = (dashboardData?.product_out?.monthly || []).find((m) => parseInt(m.month, 10) === index + 1);
          return monthData ? monthData.total_quantity : 0;
        }),
        backgroundColor: "#08B1BA",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Total Produk Masuk", "Total Produk Keluar"],
    datasets: [
      {
        label: "Jumlah Produk",
        data: [dashboardData?.product_in?.yearly_total || 0, dashboardData?.product_out?.yearly_total || 0],
        backgroundColor: ["#3A57E8", "#08B1BA"],
        borderColor: ["#3A57E8", "#08B1BA"],
        borderWidth: 1,
      },
    ],
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <>
      <NotificationModal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} title="Pemberitahuan Penting">
        {modalContent.lowStock > 0 && (
          <p>
            Terdapat <span className="font-bold text-red-600">{modalContent.lowStock} produk</span> yang memiliki stok rendah.
          </p>
        )}
        {modalContent.expiringSoon > 0 && (
          <p>
            Terdapat <span className="font-bold text-yellow-600">{modalContent.expiringSoon} produk</span> yang akan segera kadaluarsa.
          </p>
        )}
      </NotificationModal>
      <DashboardLayout>
        <div className="p-6 min-h-full">
          {/* Main and description */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center bg-white rounded-md">
              <IoFilterOutline className="text-gray-500 ml-3" size={20} />
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="cursor-pointer text-gray-600 rounded-sm p-2 bg-white text-sm font-medium focus:outline-none">
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
            {/* Stat Cards */}
            <div className="lg:col-span-2 flex flex-col gap-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <StatCard
                  title="Total Produk"
                  value={isLoading ? "..." : dashboardData?.total_stock_all || 0}
                  icon={<BsBoxSeam className="h-7 w-7 text-cyan-500" />}
                  bgColor="bg-white"
                  fontColor={"text-cyan-500"}
                  gradientColor={"bg-gradient-to-tr from-cyan-400 to-cyan-600"}
                />
                <StatCard
                  title="Produk In"
                  value={isLoading ? "..." : dashboardData?.product_in?.yearly_total || 0}
                  icon={<BsArrowDownSquare className="h-7 w-7 text-blue-700" />}
                  bgColor="bg-white"
                  fontColor={"text-blue-700"}
                  gradientColor={"bg-gradient-to-tr from-blue-500 to-blue-700"}
                />
                <StatCard
                  title="Produk Out"
                  value={isLoading ? "..." : dashboardData?.product_out?.yearly_total || 0}
                  icon={<BsArrowUpSquare className="h-7 w-7 text-yellow-600" />}
                  bgColor="bg-white"
                  fontColor={"text-yellow-500"}
                  gradientColor={"bg-gradient-to-tr from-yellow-400 to-yellow-600"}
                />
              </div>

              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Grafik Barang Masuk dan Keluar ({selectedYear})</h3>
                {!isLoading && dashboardData ? <BarChart data={barChartData} /> : <p>Loading chart...</p>}
              </div>
            </div>

            {/* Doughnut Chart And Sum Transaction & Profit */}
            <div className="grid grid-cols-1">
              {/* Transaction */}
              <div className="space-y-5">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-1 rounded-full  bg-gradient-to-tr from-green-400 to-green-600">
                      <div className="p-2 rounded-full bg-white">
                        <FaCoins className="text-green-500" size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-xl font-bold text-green-500">{isLoading ? "..." : formatRupiah(dashboardData?.summary?.total_transaction)}</p>
                      <p className="text-xs text-gray-500">Total Nilai Transaksi</p>
                    </div>
                  </div>
                  <FaHandHoldingUsd className=" text-green-500" size={30} />
                </div>

                {/* Profit */}
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-1 rounded-full  bg-gradient-to-tr from-green-400 to-green-600">
                      <div className="p-2 rounded-full bg-white">
                        <FaCoins className="text-green-500" size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-xl font-bold text-green-500">{isLoading ? "..." : formatRupiah(dashboardData?.summary?.total_profit)}</p>
                      <p className="text-xs text-gray-500">Total Nilai Profit</p>
                    </div>
                  </div>
                  <GiProfit className="text-green-500" size={30} />
                </div>
              </div>

              {/* Chart Doughnut */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-4 mt-2">
                <h3 className="text-lg font-semibold mb-4">Grafik Total Product</h3>
                {!isLoading && dashboardData ? <DoughnutChart data={doughnutChartData} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>

          {/* Product Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProductTable
              title="Produk akan kadaluarsa"
              subtitle={isLoading ? "..." : `${expiringSoonProducts.length} produk akan kadaluarsa`}
              products={expiringSoonProducts}
              icon={<IoWarningOutline className="h-8 w-8 text-yellow-500" />}
              radiusColor={"bg-yellow-400"}
            />
            <ProductTable title="Produk kadaluarsa" subtitle={isLoading ? "..." : `${expiredProducts.length} produk kadaluarsa`} products={expiredProducts} icon={<PiRecycle className="h-8 w-8 text-red-500" />} radiusColor={"bg-red-400"} />
            {/* <ProductTable title="Barang dipesan" subtitle="20 produk dipesan" products={productOrder} icon={<BsCartPlus className="h-6 w-6 text-blue-500" />} detail="/product-order" radiusColor={"bg-cyan-500"} />
          <ProductTable title="Barang sampai" subtitle="20 produk sampai" products={productArrived} icon={<BsCartCheck className="h-6 w-6 text-green-500" />} detail="/product-arrived" radiusColor={"bg-green-400"} /> */}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
