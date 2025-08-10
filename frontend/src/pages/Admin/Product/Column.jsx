import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import CustomHeader from "../../../components/tables/CustomHeader";

const columnNameMap = {
  id: "ID",
  sku: "Kode Barang",
  name: "Nama Barang",
  item_name: "Jenis Barang",
  unit_name: "Satuan",
  price: "Harga Beli",
  price_sell: "Harga Jual",
  stock: "Stok",
  min_stock: "Stok Minimum",
  total_unit: "Total Unit",
  unit_price: "Harga per Unit",
  expired_date: "Tanggal Expired",
};

export const generateColumns = (dataSample, onDelete, onEdit) => {
  if (!dataSample) return [];

  const hiddenFields = ["deleted_at", "item_id", "unit_id", "created_at", "updated_at"];

  const defaultColumns = Object.keys(dataSample)
    .filter((key) => !hiddenFields.includes(key))
    .map((key) => ({
      name: <CustomHeader title={columnNameMap[key] || key} />,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
      width: "120px",
    }));

  const actionColumn = {
    name: "ACTION",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(row)} className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 shadow-md">
          <PencilIcon className="h-4 w-4" />
        </button>
        <button onClick={() => onDelete(row)} className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    ),
    width: "120px",
  };

  return [...defaultColumns, actionColumn];
};
