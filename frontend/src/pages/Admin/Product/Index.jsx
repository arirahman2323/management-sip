import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import { products as initialProducts } from "../../../data/productData";
import SearchInput from "../../../components/layouts/ProductSearch";
import { columns as defineColumns } from "../Product/Column";
import Create from "../Product/Create";
import Delete from "../Product/Delete";
import Edit from "../Product/Edit";

const Index = () => {
  const [data, setData] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Searching Produk
  useEffect(() => {
    const result = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(result);
  }, [searchQuery]);

  // Delete Produk
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };
  const handleConfirmDelete = () => {
    if (productToDelete) {
      setData(data.filter((item) => item.id !== productToDelete.id));
      setProductToDelete(null); // Menutup modal
    }
  };

  // Edit Produk
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const columns = defineColumns(handleDeleteClick, handleEditClick);
  return (
    <div>
      <div
        className={`transition-all duration-300 ${
          isModalOpen ? "blur-sm" : ""
        }`}
      >
        <DashboardLayout>
          <div className="p-6 min-h-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-white">Product</h1>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                {/*Pencarian */}
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mencari Barang berdasarkan nama..."
                />
                {/*Add Product */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap"
                >
                  + Add Product
                </button>
              </div>

              {/* Data Table */}
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
      <Create isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Delete
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <Edit
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        productData={editingProduct}
      />
    </div>
  );
};

export default Index;
