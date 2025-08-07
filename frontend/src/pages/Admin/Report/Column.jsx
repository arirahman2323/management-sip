import React from "react";
import CustomHeader from "../../../components/tables/CustomHeader";

const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka || 0);

export const generateColumns = (reportType) => {
  const baseColumns = [
    { name: <CustomHeader title="Kode Barang" />, selector: (row) => row.sku, sortable: true, minWidth: "140px" },
    { name: <CustomHeader title="Nama Produk" />, selector: (row) => row.name, sortable: true, minWidth: "200px", grow: 2 },
    { name: <CustomHeader title="Kategori" />, selector: (row) => row.item_name, sortable: true },
    { name: <CustomHeader title="Satuan" />, selector: (row) => row.unit_name, sortable: true },
  ];

  const stockColumns = [
    ...baseColumns,
    { name: <CustomHeader title="Masuk" />, selector: (row) => row.quantity_in, sortable: true, right: true },
    { name: <CustomHeader title="Keluar" />, selector: (row) => row.quantity_out, sortable: true, right: true },
    { name: <CustomHeader title="Stok Akhir" />, selector: (row) => row.stock, sortable: true, right: true, style: { fontWeight: "bold" } },
  ];

  const productInColumns = [
    { name: <CustomHeader title="Waktu Masuk" />, selector: (row) => formatDateTime(row.created_at), sortable: true, minWidth: "220px" },
    { name: <CustomHeader title="Nama Produk" />, selector: (row) => row.product_name, sortable: true, minWidth: "300px", grow: 2 },
    { name: <CustomHeader title="Jumlah Masuk" />, selector: (row) => row.quantity, sortable: true },
    { name: <CustomHeader title="Tgl. Expired" />, selector: (row) => formatDateTime(row.expired_date), sortable: true },
  ];

  const productOutColumns = [
    { name: <CustomHeader title="Waktu Keluar" />, selector: (row) => formatDateTime(row.created_at), sortable: true, minWidth: "220px" },
    { name: <CustomHeader title="Nama Produk" />, selector: (row) => row.product_name, sortable: true, minWidth: "250px", grow: 2 },
    { name: <CustomHeader title="Jumlah Keluar" />, selector: (row) => row.quantity, sortable: true },
  ];

  switch (reportType) {
    case "stock":
      return stockColumns;
    case "product-in":
      return productInColumns;
    case "product-out":
      return productOutColumns;
    default:
      return [];
  }
};
