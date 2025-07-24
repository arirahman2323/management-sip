import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { columns as defineColumns } from "./Column";
import Arrived from "./Arrived";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(
    initialProducts.map((p) => ({ ...p, hasArrived: p.hasArrived || false }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenConfirm = (row) => {
    setSelectedProduct(row);
    setIsModalOpen(true);
  };
  const handleConfirmArrival = () => {
    setData((currentData) =>
      currentData.map((item) =>
        item.id === selectedProduct.id ? { ...item, hasArrived: true } : item
      )
    );
    setIsModalOpen(false); // Tutup modal setelah konfirmasi
  };

  const tableColumns = defineColumns(handleOpenConfirm);

  // Searching Produk
  useEffect(() => {
    const result = initialProducts
      .map((p) => ({ ...p, hasArrived: p.hasArrived || false }))
      .filter((product) =>
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
              <h1 className="text-4xl font-bold text-white">Pesanan Datang</h1>
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
                columns={tableColumns}
                data={data}
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </DashboardLayout>
      </div>
      <Arrived
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmArrival}
      />
    </div>
  );
};

export default Index;
