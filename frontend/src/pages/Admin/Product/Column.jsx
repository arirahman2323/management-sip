import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import CustomHeader from "../../../components/tables/CustomHeader";

export const columns = (onDelete, onEdit) => [
  {
    name: "id",
    selector: (row) => row.id,
    sortable: true,
    width: "60px", // Lebar tetap untuk kolom pendek
  },
  {
    name: <CustomHeader title="Item Code" />,
    selector: (row) => row.itemCode,
    sortable: true,
    minWidth: "60px",
  },
  {
    name: <CustomHeader title="Name" />,
    selector: (row) => row.name,
    sortable: true,
    minWidth: "250px",
    grow: 2, // Beri porsi ruang paling besar
  },
  {
    name: <CustomHeader title="Category" />,
    selector: (row) => row.category,
    sortable: true,
    grow: 1, // Melebar secara seimbang
  },
  {
    name: <CustomHeader title="Unit" />,
    selector: (row) => row.unit,
    sortable: true,
    grow: 1,
  },
  {
    name: <CustomHeader title="Stock" />,
    selector: (row) => row.stock,
    sortable: true,
    width: "80px",
  },
  {
    name: <CustomHeader title="Reorder" />,
    selector: (row) => row.reorder,
    sortable: true,
    width: "90px",
  },
  {
    name: <CustomHeader title="Status Reorder" />,
    selector: (row) => row.statusReorder,
    sortable: true,
    minWidth: "120px",
  },
  {
    name: <CustomHeader title="Purchase Price" />,
    selector: (row) => row.purchasePrice,
    sortable: true,
    minWidth: "140px",
  },
  {
    name: <CustomHeader title="Sell Price" />,
    selector: (row) => row.sellPrice,
    sortable: true,
    minWidth: "140px",
  },
  {
    name: <CustomHeader title="Tgl Input" />,
    selector: (row) => row.tglInput,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Tgl Expired" />,
    selector: (row) => row.tglExpired,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Warranty Period" />,
    selector: (row) => row.warrantyPeriod,
    sortable: true,
  },
  {
    name: "ACTION",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(row)}
          className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 shadow-md"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(row)}
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    ),
    width: "100px",
  },
];
