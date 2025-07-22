import React from "react";
import { XMarkIcon, CalendarIcon } from "@heroicons/react/24/solid";

const Filter = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filter Laporan</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Form Product */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="jenis-barang"
              className="block text-sm font-medium text-gray-700"
            >
              Jenis Laporan
            </label>
            <div className="flex items-center gap-2 mt-1">
              <select
                id="jenis-barang"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Pilih Jenis Laporan</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="jenis-barang"
              className="block text-sm font-medium text-gray-700"
            >
              Waktu Laporan
            </label>
            <div className="flex items-center gap-2 mt-1">
              <select
                id="jenis-barang"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Pilih Waktu Laporan</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="tanggal-expired"
              className="block text-sm font-medium text-gray-700"
            >
              Pilih Waktu
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
        </form>

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

export default Filter;
