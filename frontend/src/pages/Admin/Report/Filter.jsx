import React from "react";
import { XMarkIcon, CalendarIcon } from "@heroicons/react/24/solid";

const Filter = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
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
          {/* Satuan Barang */}
          <div className="flex flex-col">
            <label className="text-sm font-normal">Jenis Laporan</label>
            <div className="flex gap-2">
              <select
                name="unit_id"
                value="{formData.unit_id}"
                onChange="{onChange}"
                className="bg-gray-50 text-gray-500 w-full text-sm p-3 rounded-lg focus:outline-gray-500"
              >
                <option value="">Pilih Satuan Barang</option>
                {/* {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          {/* Satuan Barang */}
          <div className="flex flex-col">
            <label className="text-sm font-normal">Waktu Laporan</label>
            <div className="flex gap-2">
              <select
                name="unit_id"
                value="{formData.unit_id}"
                onChange="{onChange}"
                className="bg-gray-50 text-gray-500 w-full text-sm p-3 rounded-lg focus:outline-gray-500"
              >
                <option value="">Pilih Waktu Laporan</option>
                {/* {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-normal">Pilih Waktu</label>
            <div className="flex gap-2">
              <input
                type="date"
                id="tanggal-expired"
                className="bg-gray-50 text-gray-500 w-full text-sm p-3 rounded-lg focus:outline-gray-500"
              />
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </form>

        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 w-full py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 w-full bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
