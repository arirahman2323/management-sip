import React, { useEffect, useState } from "react";
import { XMarkIcon, CalendarIcon } from "@heroicons/react/24/solid";

const Filter = ({ isOpen, onClose, onApplyFilter, currentFilters }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilter(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filter Laporan</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-normal">Jenis Laporan</label>
            <select name="type" value={localFilters.type} onChange={handleChange} className="bg-gray-50 text-gray-700 w-full text-sm p-3 rounded-lg focus:outline-gray-500">
              <option value="stock">Laporan Stok</option>
              <option value="product-in">Laporan Barang Masuk</option>
              <option value="product-out">Laporan Barang Keluar</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-normal">Tanggal Mulai</label>
              <input type="date" name="start" value={localFilters.start} onChange={handleChange} required className="bg-gray-50 text-gray-700 w-full text-sm p-3 rounded-lg focus:outline-gray-500" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal">Tanggal Selesai</label>
              <input type="date" name="end" value={localFilters.end} onChange={handleChange} required className="bg-gray-50 text-gray-700 w-full text-sm p-3 rounded-lg focus:outline-gray-500" />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Terapkan Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
