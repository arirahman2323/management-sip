import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { columns as defineColumns } from "./Column";
import WillExp from "./WillExp";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (row) => {
    setSelectedProduct(row); // Simpan data baris yang dipilih
    setIsModalOpen(true); // Buka modal
  };

  const columns = defineColumns(handleEdit);

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
              <h1 className="text-4xl font-bold text-white">
                Produk yang akan Kadaluarsa
              </h1>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                {/*Pencarian */}
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mencari Barang berdasarkan Nama..."
                />
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
      <WillExp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;
