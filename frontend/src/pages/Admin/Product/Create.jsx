import React, { useState } from "react";
import { XMarkIcon, PlusIcon, CalendarIcon } from "@heroicons/react/24/solid";
import AddCategory from "./AddCategory";
import AddUnit from "./AddUnit";

const Create = ({ isOpen, onClose }) => {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isUnitModalOpen, setUnitModalOpen] = useState(false);
  if (!isOpen) return null;

  return (
    <>
      // Latar belakang gelap (overlay) dengan efek blur
      <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        {/* Konten Modal */}
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
          {" "}
          {/* Dibuat lebih lebar */}
          {/* Header Modal */}
          <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Tambah Barang</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          {/* Form Input */}
          <form>
            {/* 2. Menggunakan Grid untuk layout 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Kode Barang */}
              <div>
                <label
                  htmlFor="kode-barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kode Barang
                </label>
                <input
                  type="text"
                  id="kode-barang"
                  placeholder="Masukkan Kode Barang Anda"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Nama Barang */}
              <div>
                <label
                  htmlFor="nama-barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="nama-barang"
                  placeholder="Masukkan Nama Barang Anda"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Jenis Barang dengan Tombol + */}
              <div>
                <label
                  htmlFor="jenis-barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jenis Barang
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    id="jenis-barang"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Pilih Jenis Barang</option>
                  </select>
                  <button
                    onClick={() => setCategoryModalOpen(true)}
                    type="button"
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
                  </button>
                </div>
              </div>
              {/* Satuan dengan Tombol + */}
              <div>
                <label
                  htmlFor="satuan-barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Satuan
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    id="satuan-barang"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Pilih Satuan Barang</option>
                  </select>
                  <button
                    onClick={() => setUnitModalOpen(true)}
                    type="button"
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
                  </button>
                </div>
              </div>
              {/* Stok Barang */}
              <div>
                <label
                  htmlFor="stok-barang"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stok Barang
                </label>
                <input
                  type="number"
                  id="stok-barang"
                  placeholder="50"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Harga Beli */}
              <div>
                <label
                  htmlFor="harga-beli"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga Beli
                </label>
                <input
                  type="text"
                  id="harga-beli"
                  placeholder="Rp. 24.000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Harga Jual */}
              <div>
                <label
                  htmlFor="harga-jual"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga Jual
                </label>
                <input
                  type="text"
                  id="harga-jual"
                  placeholder="Rp. 24.000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Profit */}
              <div>
                <label
                  htmlFor="profit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profit
                </label>
                <input
                  type="text"
                  id="profit"
                  placeholder="Rp. 4.000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                  readOnly
                />
              </div>
              {/* Harga Satuan */}
              <div>
                <label
                  htmlFor="harga-satuan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga Satuan
                </label>
                <input
                  type="text"
                  id="harga-satuan"
                  placeholder="Rp. 4.000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Jumlah Satuan */}
              <div>
                <label
                  htmlFor="jumlah-satuan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jumlah Satuan
                </label>
                <input
                  type="number"
                  id="jumlah-satuan"
                  placeholder="40"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Tanggal Expired */}
              <div className="md:col-span-2">
                <label
                  htmlFor="tanggal-expired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tanggal Expired
                </label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    id="tanggal-expired"
                    className="block w-full rounded-md border-gray-300 shadow-sm pl-3 pr-10 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <CalendarIcon className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </form>
          {/* Footer Modal (Tombol) */}
          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
      <AddUnit
        isOpen={isUnitModalOpen}
        onClose={() => setUnitModalOpen(false)}
      />
    </>
  );
};

export default Create;
