import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import CustomHeader from "../../../components/tables/CustomHeader";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";

export const columns = (onCheck) => [
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
    cell: (row) =>
      // Gunakan conditional rendering di sini
      row.hasArrived ? (
        // Jika sudah datang, tampilkan ikon tercentang (tidak bisa diklik)
        <FaCheckSquare className="h-5 w-5 text-green-500" />
      ) : (
        // Jika belum, tampilkan tombol dengan ikon belum tercentang
        <button
          onClick={() => onCheck(row)} // Panggil handler saat diklik
          className="p-2 text-blue-600 rounded-md hover:text-blue-800 cursor-pointer"
        >
          <FaRegCheckSquare className="h-5 w-5" />
        </button>
      ),
    center: true, // Posisikan ikon di tengah
    width: "100px",
  },
];

export default columns;
