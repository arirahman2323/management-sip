import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const NotificationModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-down">
        <div className="flex items-start justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-3">
            <BellAlertIcon className="h-7 w-7 text-gray-800" />
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="text-gray-700 space-y-3 my-5">{children}</div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button onClick={onClose} className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Oke
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
