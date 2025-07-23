import React from "react";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/solid";

const Order = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
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
        {/* Form Product */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="jumlah"
              className="block text-sm font-medium text-gray-700"
            >
              Jumlah Order Barang
            </label>
            <input
              type="number"
              id="jumlah"
              placeholder="50"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
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

export default Order;
