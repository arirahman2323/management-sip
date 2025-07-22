import React from "react";
import CustomHeader from "../../../components/tables/CustomHeader";

export const columns = [
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
    grow: 1,
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
    name: <CustomHeader title="Tanggal" />,
    selector: (row) => row.tglInput,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Harga Satuan" />,
    selector: (row) => row.purchasePrice,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Profit" />,
    selector: (row) => row.profit,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Total Harga" />,
    selector: (row) => row.sumPrice,
    sortable: true,
    minWidth: "130px",
  },
  {
    name: <CustomHeader title="Total Profit" />,
    selector: (row) => row.sumProfit,
    sortable: true,
    minWidth: "130px",
  },
];
export default columns;
