import React from "react";
import CustomHeader from "../../../components/tables/CustomHeader";

export const generateColumns = () => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") {
      return "-";
    }

    try {
      const date = new Date(dateString);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return new Intl.DateTimeFormat("id-ID", options).format(date);
    } catch (error) {
      return dateString;
    }
  };
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
      name: <CustomHeader title="Jenis Barang" />,
      selector: (row) => row.category || "-",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: <CustomHeader title="Satuan" />,
      selector: (row) => row.unit || "-",
      sortable: true,
      minWidth: "100px",
    },
    {
      name: <CustomHeader title="Jumlah Masuk" />,
      selector: (row) => row.stock || 0,
      sortable: true,
      width: "140px",
    },
    {
      name: <CustomHeader title="Tgl. Expired" />,
      selector: (row) => formatDate(row.tglInput),
      sortable: true,
      minWidth: "180px",
    },
  ];
};
