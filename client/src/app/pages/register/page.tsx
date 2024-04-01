"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

// 3rd party libraries
// axios
import axios from "axios";
// react-toastify
import { toast } from "react-toastify";

// components
import Loader from "@/components/Loader";

const RegisterPage: React.FC = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = values;
    const registerNewUser = { name, email, password, confirmPassword };

    try {
      setLoading(true);

      const response = await axios.post("/register", registerNewUser);

      if (response.statusText === "Created") {
        //toast.success("User registered succesfully");
        setSuccessMsg(response.data.msg);
      } else {
        toast.error(response.data.msg);
        setErrorMsg(response.data.msg);
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setErrorMsg(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[1100px] w-full pt-[4rem] mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0 my-4 sm:my-0">
      {successMsg ? (
        <p className="mb-4 bg-green-200 rounded flex items-center justify-center py-4 px-8 border-[2px] border-green-500 font-semibold">
          Please check your email account to verify.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-[500px] border border-[var(--gray-1)] rounded-[var(--radius-3)] p-8"
        >
          <p className="font-bold text-2xl">Register</p>
          <div className="flex flex-col mt-4">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-[var(--gray-1)] rounded mt-2 p-2 focus:outline-[var(--blue-1)]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border border-[var(--gray-1)] rounded mt-2 p-2 focus:outline-[var(--blue-1)]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-[var(--gray-1)] rounded mt-2 p-2 focus:outline-[var(--blue-1)]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border border-[var(--gray-1)] rounded mt-2 p-2 focus:outline-[var(--blue-1)]"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="h-[42px] font-semibold border border-[var(--blue-1)] rounded mt-4 p-2 w-full bg-[var(--blue-1)] text-[var(--white-1)] hover:bg-[var(--blue-2)] flex items-center justify-center"
          >
            {loading ? <Loader /> : "Register"}
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/pages/login" className="text-[var(--blue-1)]">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
