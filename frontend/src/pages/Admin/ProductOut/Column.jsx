import React from "react";
import CustomHeader from "../../../components/tables/CustomHeader";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

export const generateColumns = () => {
  return [
    {
      name: <CustomHeader title="Kode Barang" />,
      selector: (row) => row.itemCode || "-",
      sortable: true,
      minWidth: "140px",
    },
    {
      name: <CustomHeader title="Nama Produk" />,
      selector: (row) => row.name || "-",
      sortable: true,
      minWidth: "250px",
      grow: 2,
    },
    {
      name: <CustomHeader title="Jumlah Keluar" />,
      selector: (row) => row.quantity || 0,
      sortable: true,
      width: "150px",
      right: "true",
    },
    {
      name: <CustomHeader title="Tanggal Keluar" />,
      selector: (row) => formatDate(row.date),
      sortable: true,
      minWidth: "200px",
    },
  ];
};
