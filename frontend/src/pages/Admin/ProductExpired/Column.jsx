import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import CustomHeader from "../../../components/tables/CustomHeader";
import { LuArrowRightLeft } from "react-icons/lu";

export const columns = (onEdit, onDelete) => [
  {
    name: "id",
    selector: (row) => row.id,
    sortable: true,
    width: "60px",
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
    grow: 2,
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
    name: <CustomHeader title="Tgl Expired" />,
    selector: (row) => row.tglExpired,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Jangka Waktu" />,
    selector: (row) => row.warrantyPeriod,
    sortable: true,
  },
  {
    name: "ACTION",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(row)}
          className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 shadow-md cursor-pointer"
        >
          <LuArrowRightLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(row)}
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md cursor-pointer"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    ),
    width: "100px",
  },
];

export default columns;
