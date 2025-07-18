import React from "react";

const ProductTable = ({ title, subtitle, products, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        {/* Grup untuk Ikon dan Judul */}
        <div className="flex items-center">
          {/* Wadah untuk menata ikon */}
          {icon && (
            <div className="bg-blue-100 text-blue-500 rounded-full p-2">
              {icon}
            </div>
          )}
        </div>
        <div className="pl-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="ml-auto text-blue-500 font-semibold border border-blue-500 rounded-2xl px-4 py-1 pt-2 text-sm cursor-pointer hover:bg-blue-500 hover:text-white">
          Detail
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="border-b border-gray-100">
          <tr className="text-gray-500 text-sm bg-gray-100">
            <th className="font-normal pt-2 pl-1.5 pb-2">Nama produk</th>
            <th className="font-normal pt-2 pl-1.5 pb-2">Tanggal Expired</th>
            <th className="font-normal pt-2 pl-1.5 pb-2">Jenis Barang</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {products.map((product, index) => (
            <tr key={index} className="even:bg-gray-200">
              <td className="pr-1 pb-2 pt-2 pl-1.5">{product.name}</td>
              <td className="pr-1 pb-2 pt-2 pl-1.5">{product.expired}</td>
              <td className="pr-1 pb-2 pt-2 pl-1.5">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
