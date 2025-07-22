import React from "react";
import CustomHeader from "../../../components/tables/CustomHeader";

export const columns = [
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
    name: <CustomHeader title="Tgl Input" />,
    selector: (row) => row.tglInput,
    sortable: true,
    minWidth: "130px",
  },
];
export default columns;
