import React from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

const AddCategory = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Contoh data jenis barang yang sudah ada
  const existingCategories = [
    "Makanan",
    "Minuman",
    "Kebutuhan Rumah",
    "Elektronik",
  ];

  return (
    // z-60 agar muncul di atas modal pertama (yang z-50)
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-center z-60">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Tambah Jenis Barang
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Daftar Jenis Barang yang Ada */}
        <div className="space-y-2 mb-4">
          {existingCategories.map((cat, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <span>{cat}</span>
              <button className="text-gray-400 hover:text-red-500">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Input untuk Menambah Jenis Barang Baru */}
        <div>
          <label
            htmlFor="new-category"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Jenis Barang
          </label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              id="new-category"
              placeholder="Masukan Nama Barang Anda"
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              <PlusIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-end gap-4 border-t pt-4">
          <button
            onClick={onClose}
            type="button"
            className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
