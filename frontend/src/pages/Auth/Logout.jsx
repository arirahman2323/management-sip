// src/components/modals/LogoutConfirm.jsx

import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Logout = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
        {/* Ikon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        </div>

        {/* Teks Konfirmasi */}
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
          Apakah Anda yakin ingin keluar?
        </h3>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            type="button"
            className="w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cansel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
