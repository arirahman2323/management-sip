import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductSearch = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full md:w-1/3">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder || "Mencari..."}
        value={value}
        onChange={onChange}
      />
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
    </div>
  );
};

export default ProductSearch;
