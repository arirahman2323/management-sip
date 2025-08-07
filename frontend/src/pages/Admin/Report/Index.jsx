import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import SearchInput from "../../../components/layouts/ProductSearch";
import { generateColumns } from "./Column";
import { IoFilterOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import Filter from "./Filter";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { FaFilter } from "react-icons/fa";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatDate = (date) => date.toISOString().split("T")[0];

const getInitialDates = () => {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth(), 1);
  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};

const Index = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({
    type: "stock",
    ...getInitialDates(),
  });

  const [pageTitle, setPageTitle] = useState("Laporan Stok");
  const [isLoading, setIsLoading] = useState(true);

  const downloadMenuRef = useRef(null);

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);

      let endpoint;
      let title;
      switch (filterParams.type) {
        case "product-in":
          endpoint = API_PATHS.REPORT.GET_REPORT_IN(filterParams.start, filterParams.end);
          title = "Laporan Barang Masuk";
          break;
        case "product-out":
          endpoint = API_PATHS.REPORT.GET_REPORT_OUT(filterParams.start, filterParams.end);
          title = "Laporan Barang Keluar";
          break;
        case "stock":
        default:
          endpoint = API_PATHS.REPORT.GET_REPORT_STOCK(filterParams.start, filterParams.end);
          title = "Laporan Stok";
      }
      setPageTitle(title);

      try {
        const res = await axiosInstance.get(endpoint);
        const data = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
        setReportData(data);
        setFilteredData(data);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setReportData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [filterParams]);

  useEffect(() => {
    const result = reportData.filter((item) => {
      if (searchField === "all") {
        return Object.values(item).some((val) => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
      } else {
        const fieldValue = item[searchField];
        return fieldValue?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
    setFilteredData(result);
  }, [searchQuery, searchField, reportData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setIsDownloadMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApplyFilter = (newFilters) => {
    setFilterParams(newFilters);
  };

  const columns = generateColumns(filterParams.type);
  const formattedStartDate = new Date(filterParams.start).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const formattedEndDate = new Date(filterParams.end).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  // Download Excel
  const handleDownloadExcel = () => {
    const dataToExport = filteredData.map((row) => {
      const rowData = {};
      columns.forEach((col) => {
        if (col.name && col.name.props && col.name.props.title) {
          rowData[col.name.props.title] = col.selector(row);
        }
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

    const fileName = `${pageTitle}_${filterParams.start}_sd_${filterParams.end}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    setIsDownloadMenuOpen(false);
  };

  // Download PDF
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const headers = columns.map((col) => col.name.props.title).filter(Boolean);
    const tableData = filteredData.map((row) =>
      columns
        .map((col) => {
          const value = col.selector(row);
          return value !== null && value !== undefined ? value.toString() : "-";
        })
        .filter((_, index) => columns[index].name.props.title)
    );

    doc.text(`${pageTitle}`, 14, 15);
    doc.setFontSize(10);
    doc.text(`Periode: ${formattedStartDate} - ${formattedEndDate}`, 14, 20);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 25,
    });

    const fileName = `${pageTitle}_${filterParams.start}_sd_${filterParams.end}.pdf`;
    doc.save(fileName);
    setIsDownloadMenuOpen(false);
  };

  return (
    <div>
      <div>
        <DashboardLayout>
          <div className="p-6 min-h-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>
                <p className="text-white/80 text-sm mt-1">
                  {formattedStartDate} - {formattedEndDate}
                </p>
              </div>
              <button onClick={() => setIsFilterModalOpen(true)} className="flex items-center text-gray-500 rounded-lg p-2 bg-white font-medium hover:bg-gray-300 hover:text-gray-600 cursor-pointer">
                <IoFilterOutline className="mr-2" size={20} />
                Filter Laporan
              </button>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
                  <FaFilter size={20} className="ml-2 text-gray-500" />
                  <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="p-2 text-sm border-r-2 border-gray-300 outline-none text-gray-700">
                    <option value="all">Semua</option>
                    <option value="sku">Kode Barang</option>
                    <option value="name">Nama Produk</option>
                    <option value="item_name">Kategori</option>
                    <option value="unit_name">Satuan</option>
                  </select>
                  <div className="flex items-center px-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input type="text" className="w-full p-2 text-sm outline-none" placeholder="Cari dalam laporan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="relative" ref={downloadMenuRef}>
                  <button onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)} className="flex items-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer">
                    <MdDownload className="mr-2" size={20} />
                    Download
                  </button>
                  {isDownloadMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-300">
                      <button onClick={handleDownloadExcel} className="w-full text-left rounded-t-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Download Excel (.xlsx)
                      </button>
                      <button onClick={handleDownloadPdf} className="w-full text-left rounded-b-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Download PDF (.pdf)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Data Table Produk */}
              <DataTable columns={columns} data={filteredData} pagination highlightOnHover noDataComponent={<div className="p-4">Tidak ada data untuk filter yang dipilih.</div>} />
            </div>
          </div>
          <Filter isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} currentFilters={filterParams} onApplyFilter={handleApplyFilter} />
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Index;
