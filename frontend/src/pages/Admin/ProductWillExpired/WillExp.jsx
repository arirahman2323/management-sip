import React from "react";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/solid";

const WillExp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Form Restock Barang
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Form Product Restock */}
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-normal">Jumlah Restock barang</label>
            <input
              type="number"
              name="number"
              value="{formData.name}"
              onChange="{onChange}"
              className="bg-gray-50 text-gray-500 text-sm p-3 rounded-lg focus:outline-gray-500"
              placeholder="Jumlah"
            />
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

export default WillExp;
