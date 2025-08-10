import React, { useEffect, useState } from "react";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import toast from "react-hot-toast";
import BarcodeScanner from "../../../components/scanner/BarcodeScanner";

const initialState = {
  product_id: "",
  quantity: 1,
  note: "",
};

const ProductOut = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialState);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const fetchMasterProducts = async () => {
        setIsLoading(true);
        try {
          const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCT);
          setProducts(res?.data?.data || []);
        } catch (error) {
          toast.error("Gagal mengambil daftar produk");
        } finally {
          setIsLoading(false);
        }
      };
      fetchMasterProducts();
    }
  }, [isOpen]);

  const handleScanResult = (scannedSku) => {
    if (scannedSku) {
      const foundProduct = products.find((p) => p.sku === scannedSku);
      if (foundProduct) {
        setFormData((prev) => ({ ...prev, product_id: foundProduct.id }));
        toast.success(`Produk ditemukan: ${foundProduct.name}`);
      } else {
        toast.error(`Produk dengan SKU "${scannedSku}" tidak ditemukan.`);
      }
      setIsScannerOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.product_id || !formData.quantity) {
      toast.error("Produk dan kuantitas wajib diisi!");
      return;
    }

    const payload = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
    };

    try {
      await axiosInstance.post(API_PATHS.PRODUCT_OUT.CREATE_PRODUCT_OUT, payload);
      toast.success("Barang keluar berhasil dicatat");
      onClose();
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal mencatat barang keluar";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <BarcodeScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onScan={handleScanResult} />
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Form Barang Keluar</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div onClick={() => setIsScannerOpen(true)} className="text-center p-6 rounded-lg mb-4 bg-gray-100 cursor-pointer">
            <CameraIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Klik untuk Memindai SKU Produk</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-normal">
                Pilih Produk <span className="text-red-500">*</span>
              </label>
              <select name="product_id" value={formData.product_id} onChange={handleInputChange} className="bg-gray-50 rounded-lg p-3 text-sm" disabled={isLoading} required>
                <option value="">{isLoading ? "Memuat..." : "Pilih produk atau pindai"}</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Stok: {product.stock})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-normal">
                Jumlah Keluar <span className="text-red-500">*</span>
              </label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="bg-gray-50 rounded-lg p-3 text-sm" min="1" required />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-normal">Catatan</label>
              <textarea name="note" value={formData.note} onChange={handleInputChange} className="bg-gray-50 rounded-lg p-3 text-sm" placeholder="Contoh: Untuk proyek A" rows="3"></textarea>
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <button type="button" onClick={onClose} className="px-4 w-full py-2 border rounded-md hover:bg-gray-100">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 w-full bg-indigo-500 text-white rounded-md hover:bg-indigo-600" disabled={isLoading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductOut;
