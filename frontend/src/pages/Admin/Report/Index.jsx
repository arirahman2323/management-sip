import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { columns } from "./Column";
import { IoFilterOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import Filter from "./Filter";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Searching Produk
  useEffect(() => {
    const result = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(result);
  }, [searchQuery]);

  return (
    <div>
      <div>
        <DashboardLayout>
          <div className="p-6 min-h-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-white">
                Laporan Bulan Juli 2025
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex cursor-pointer items-center pt-2.5 text-white rounded-xl p-2 bg-indigo-700 text-sm font-medium hover:bg-white hover:text-indigo-700"
              >
                <IoFilterOutline className="item-center pr-1 pb-1" size={20} />
                Filter Tahun
              </button>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                {/*Pencarian */}
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mencari Barang berdasarkan Nama..."
                />
                {/*Download Report */}
                <button
                  //   onClick={() => setIsModalOpen(true)}
                  className="flex cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap"
                >
                  <MdDownload className="item-center pr-1" size={25} />
                  Download Laporan
                </button>
              </div>

              {/* Data Table Produk */}
              <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </DashboardLayout>
      </div>
      <Filter isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
