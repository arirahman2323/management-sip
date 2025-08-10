import React, { useEffect, useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import toast from "react-hot-toast";

const AddCategory = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.CATEGORY.GET_CATEGORY);
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Gagal memuat jenis barang");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
    };

    try {
      if (editId) {
        await axiosInstance.put(API_PATHS.CATEGORY.UPDATE_CATEGORY(editId), payload);
        toast.success("Jenis barang diperbarui");
      } else {
        await axiosInstance.post(API_PATHS.CATEGORY.CREATE_CATEGORY, payload);
        toast.success("Jenis barang ditambahkan");
      }
      setName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      toast.error("Gagal menyimpan jenis barang");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditId(category.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      try {
        await axiosInstance.delete(API_PATHS.CATEGORY.DELETE_CATEGORY(id));
        toast.success("Jenis barang dihapus");
        fetchCategories();
      } catch (error) {
        toast.error("Gagal menghapus jenis barang");
      }
    }
  };

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Tambah Jenis Barang</h2>
          <button onClick={onClose} className="text-gray-700 mb-5 hover:text-black">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <ul className="space-y-2 bg-gray-100 p-4 rounded-lg">
          {categories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center pb-2">
              <span className="text-gray-700">{cat.name}</span>
              <div className="space-x-2">
                <button onClick={() => handleEdit(cat)} className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(cat.id)} className="text-sm text-red-600 cursor-pointer hover:text-red-700">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="my-2">Nama Jenis Barang</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input type="text" placeholder="Nama Jenis Barang" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 w-full text-gray-500 text-sm p-3 rounded-lg focus:outline-gray-500" required />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            {editId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
