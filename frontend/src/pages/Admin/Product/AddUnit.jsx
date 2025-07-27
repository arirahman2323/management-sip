import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AddUnit = ({ isOpen, onClose }) => {
  const [units, setUnits] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUnits = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.UNIT.GET_UNIT);
      setUnits(res.data.data);
    } catch {
      toast.error("Gagal memuat satuan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(API_PATHS.UNIT.UPDATE_UNIT(editId), { name });
        toast.success("Satuan diperbarui");
      } else {
        await axiosInstance.post(API_PATHS.UNIT.CREATE_UNIT, { name });
        toast.success("Satuan ditambahkan");
      }
      setName("");
      setEditId(null);
      fetchUnits();
    } catch {
      toast.error("Gagal menyimpan satuan");
    }
  };

  const handleEdit = (unit) => {
    setEditId(unit.id);
    setName(unit.name);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      try {
        await axiosInstance.delete(API_PATHS.UNIT.DELETE_UNIT(id));
        toast.success("Satuan dihapus");
        fetchUnits();
      } catch {
        toast.error("Gagal menghapus satuan");
      }
    }
  };

  useEffect(() => {
    if (isOpen) fetchUnits();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Kelola Satuan</h2>
          <button onClick={onClose} className="text-gray-700 mb-5 hover:text-black">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <ul className="space-y-2 bg-gray-100 p-4 rounded-lg">
          {units.map((unit) => (
            <li key={unit.id} className="flex justify-between items-center pb-2">
              <span className="text-gray-700">{unit.name}</span>
              <div className="space-x-2">
                <button onClick={() => handleEdit(unit)} className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(unit.id)} className="text-sm text-red-600 cursor-pointer hover:text-red-700">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="my-2">Nama Satuan</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input type="text" placeholder="Nama satuan" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 w-full text-gray-500 text-sm p-3 rounded-lg focus:outline-gray-500" required />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            {editId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUnit;
