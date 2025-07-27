import React, { useState } from "react";
import { API_PATHS } from "../../../utils/apiPath";
import axiosInstance from "../../../utils/axiosInstance";
import ProductForm from "../../../components/ProductForm";
import toast from "react-hot-toast";

const Create = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    item_id: "",
    unit_id: "",
    price: 0,
    price_sell: 0,
    min_stock: 0,
    stock: 0,
    total_unit: 0,
    unit_price: 0,
    expired_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "price_sell", "min_stock", "stock", "total_unit", "unit_price"].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATHS.PRODUCT.CREATE_PRODUCT, formData);
      toast.success("Produk berhasil ditambahkan!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan produk.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow w-[400px] max-h-[90vh]">
        <div className="p-3 border-b border-gray-500 text-lg text-gray-800 font-semibold flex justify-between items-center">
          Form Barang
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            ×
          </button>
        </div>
        <ProductForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default Create;
