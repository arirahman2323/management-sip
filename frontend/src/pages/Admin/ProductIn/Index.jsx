import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { FaFilter } from "react-icons/fa";
import Create from "../ProductIn/Create";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { generateColumns } from "./Column";

const Index = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = generateColumns();

  const fetchProductIn = async () => {
    try {
      const [productInRes, masterProductRes] = await Promise.all([
        axiosInstance.get(API_PATHS.PRODUCT_IN.GET_PRODUCT_IN),
        axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCT),
      ]);

      const productInList = productInRes?.data || [];
      const masterProductList = masterProductRes?.data?.data || [];

      const productMap = new Map(
        masterProductList.map((product) => [product.id, product])
      );

      const formattedData = productInList.map((item) => {
        const productDetails = productMap.get(item.product_id);

        return {
          id: item.id,
          itemCode: productDetails?.sku || "N/A",
          name: productDetails?.name || "Produk Tidak Ditemukan",
          category: productDetails?.item_name || "N/A",
          unit: productDetails?.unit_name || "N/A",
          stock: item.quantity || 0,
          tglInput: item.expired_date || "-",
        };
      });

      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Gagal mengambil atau menggabungkan data:", error);
      setData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchProductIn();
  }, []);

  useEffect(() => {
    if (!Array.isArray(data)) {
      setFilteredData([]);
      return;
    }

    const result = data.filter((item) => {
      if (searchField === "all") {
        return Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return String(item[searchField])
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    });

    setFilteredData(result);
  }, [searchQuery, data, searchField]);

  return (
    <div className="transition-all duration-300">
      <DashboardLayout>
        <div className="p-6 min-h-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-white">Product In</h1>
          </div>

          <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              {/* Pencarian */}
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
                <FaFilter size={20} className="ml-2 text-gray-500" />
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="p-2 text-sm border-r-2 border-gray-300 outline-none text-gray-700"
                >
                  <option value="all">All</option>
                  <option value="itemCode">Kode Barang</option>
                  <option value="name">Nama</option>
                  <option value="category">Jenis Barang</option>
                  <option value="unit">Satuan</option>
                  <option value="stock">Jumlah</option>
                  <option value="tglInput">Tanggal Expired</option>
                </select>
                <div className="flex items-center px-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full p-2 text-sm outline-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Add Product In */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap"
              >
                + Add Product In
              </button>
            </div>

            {/* Tabel */}
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              noDataComponent={
                <div className="text-center text-gray-500 p-4">
                  Tidak ada data produk masuk.
                </div>
              }
            />
          </div>
        </div>
      </DashboardLayout>

      {/* Modal Tambah */}
      <Create
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchProductIn();
        }}
      />
    </div>
  );
};

export default Index;
