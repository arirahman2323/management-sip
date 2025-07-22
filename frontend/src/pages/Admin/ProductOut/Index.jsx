import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { columns } from "./Column"; // Pastikan impor kolomnya benar
import ProductOut from "./ProductOut";
import UnitOut from "./UnitOut";

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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-white">Product Out</h1>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                {/*Pencarian */}
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mencari Barang berdasarkan Nama..."
                />
                <div className="flex space-x-4">
                  {/*Unit Product */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap"
                  >
                    + Unit Out
                  </button>
                  {/* Product Out */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap"
                  >
                    + Product Out
                  </button>
                </div>
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
      <ProductOut isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UnitOut isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
