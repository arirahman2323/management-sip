import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { products as initialProducts } from "../../../data/productData";
import { columns as defineColumns } from "./Column";
import WillExp from "./WillExp";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { FaFilter } from "react-icons/fa";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchField, setSearchField] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const handleEdit = (row) => {
    setSelectedProduct(row);
    setIsModalOpen(true);
  };

  const columns = defineColumns(handleEdit);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCT);
      setData(res.data.data);
      setFilteredData(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // Pencarian
  useEffect(() => {
    const result = data.filter((product) => {
      if (searchField === "all") {
        return Object.values(product).some((val) =>
          val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        const fieldValue = product[searchField];
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    });

    setFilteredData(result);
  }, [searchQuery, data]);

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
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
                  <FaFilter size={20} className="ml-2 text-gray-500" />
                  <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="p-2 text-sm border-r-2 border-gray-300 outline-none text-gray-700"
                  >
                    <option value="all">All</option>
                    <option value="sku">Kode Barang</option>
                    <option value="name">Nama</option>
                    <option value="item_name">Jenis Barang</option>
                    <option value="unit_name">Satuan</option>
                    <option value="price">Harga Beli</option>
                    <option value="price_sell">Harga Jual</option>
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
              </div>

              {/* Data Table Produk */}
              <DataTable
                columns={columns}
                data={filteredData}
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
