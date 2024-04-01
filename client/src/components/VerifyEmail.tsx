"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 3rd party libraries
// axios
import axios from "axios";
// react-toastify
import { toast } from "react-toastify";
import { error } from "console";

const VerifyEmail: React.FC = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const verifyToken = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/verifyEmail", {
        verificationToken: token,
        email,
      });

      console.log(response);

      if (response.statusText === "OK") {
        //toast.success("Verification successful");
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

  useEffect(() => {
    if (errorMsg === "User already verified") {
      router.push("/pages/login");
    }
  }, [errorMsg]);

  useEffect(() => {
    if (errorMsg === "User already verified") {
      router.push("/pages/login");
    }
    verifyToken();
  }, []);

  return (
    <div className="max-w-[1100px] w-full pt-[4rem] mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0 my-4 sm:my-0">
      {loading && (
        <div>
          <p>Verifying</p>
          <p>Loading...</p>
        </div>
      )}

      {successMsg ? (
        <div>
          <p className="mb-4 bg-green-200 rounded flex items-center justify-center py-4 px-8 border-[2px] border-green-500 font-semibold">
            Account verification successful.
          </p>
          <Link
            href="/pages/login"
            className="h-[42px] bg-[var(--blue-1)] text-white rounded flex items-center justify-center"
          >
            Login
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VerifyEmail;
