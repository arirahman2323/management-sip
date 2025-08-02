import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import ProductOut from "./ProductOut";
import UnitOut from "./UnitOut";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { FaFilter } from "react-icons/fa";
import { generateColumns } from "./Column";

const Index = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [isProductOutOpen, setIsProductOutOpen] = useState(false);

  const columns = generateColumns();

  const fetchProductOutData = async () => {
    try {
      const [productOutRes, masterProductRes] = await Promise.all([axiosInstance.get(API_PATHS.PRODUCT_OUT.GET_PRODUCT_OUT), axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCT)]);
      const productOutList = productOutRes?.data || [];
      const masterProductList = masterProductRes?.data?.data || [];
      const productMap = new Map(masterProductList.map((p) => [p.id, p]));

      const formattedData = productOutList.map((item) => {
        const productDetails = productMap.get(item.product_id);
        return {
          id: item.id,
          date: item.created_at,
          itemCode: productDetails?.sku || "N/A",
          name: productDetails?.name || "Produk Tidak Ditemukan",
          quantity: item.quantity,
          note: item.note,
        };
      });

      setData(formattedData);
      setFilteredData(formattedData);
    } catch (err) {
      console.error("Error fetching product out data:", err);
    }
  };

  useEffect(() => {
    fetchProductOutData();
  }, []);

  // Pencarian
  useEffect(() => {
    const result = data.filter((item) => {
      if (searchField === "all") {
        return Object.values(item).some((val) => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
      } else {
        return item[searchField]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
    setFilteredData(result);
  }, [searchQuery, searchField, data]);

  return (
    <DashboardLayout>
      <div className="p-6 min-h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Product Out</h1>
        </div>
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            {/* Pencarian */}
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
              <FaFilter size={20} className="ml-2 text-gray-500" />
              <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="p-2 text-sm border-r-2 border-gray-300 outline-none text-gray-700">
                <option value="all">All</option>
                <option value="itemCode">Kode Barang</option>
                <option value="name">Nama Produk</option>
                <option value="note">Catatan</option>
              </select>
              <div className="flex items-center px-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="text" className="w-full p-2 text-sm outline-none" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {/* Tombol Add Product Out */}
            <button onClick={() => setIsProductOutOpen(true)} className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              + Product Out
            </button>
          </div>
          {/* Tabel Data */}
          <DataTable columns={columns} data={filteredData} pagination highlightOnHover noDataComponent={<div className="p-4">Tidak ada data barang keluar.</div>} />
        </div>
      </div>
      {/* Modal Product Out */}
      <ProductOut
        isOpen={isProductOutOpen}
        onClose={() => {
          setIsProductOutOpen(false);
          window.location.reload();
        }}
      />
      {/* <UnitOut isOpen={isUnitOpen} onClose={() => setIsUnitOpen(false)} /> */}
    </DashboardLayout>
  );
};

export default Index;
