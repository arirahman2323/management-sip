import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Logo from "../../components/logo/BlueLogo";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);

      toast.success("Pendaftaran berhasil! Silakan login.");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (typeof errorData === "string" && errorData.includes("UNIQUE constraint failed: users.email")) {
          toast.error("Email ini sudah terdaftar. Silakan gunakan email lain.");
        } else {
          toast.error(errorData.message || "Pendaftaran gagal. Terjadi kesalahan.");
        }
      } else {
        toast.error("Pendaftaran gagal. Periksa koneksi internet Anda.");
      }
    }
  };
  return (
    <AuthLayout imageSide="left">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="justify-center" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Daftar Akun</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Buat akun Anda</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Daftar
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Akun sudah ada?{" "}
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
