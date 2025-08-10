import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Logo from "../../components/logo/BlueLogo";

const Register = () => {
  return (
    <AuthLayout imageSide="left">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="justify-center" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Daftar Akun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Buat akun Anda
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Nama"
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="shadow-sm relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="confirm-password"
              type="password"
              required
              placeholder="Konfirmasi password"
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
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
