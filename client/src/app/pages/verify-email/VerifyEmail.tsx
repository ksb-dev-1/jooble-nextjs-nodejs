"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- redux -----
import { useVerifyEmailMutation } from "@/redux/slices/authApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();
  const [verifyEmail, { isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();

  const verifyToken = async () => {
    try {
      const res = await verifyEmail({
        verificationToken: token,
        email,
      }).unwrap();

      if (isError) {
        toast.error(res.data.msg);
      }
    } catch (err) {
      const error = err as ErrorProps;

      if (error?.data?.msg === "User already verified") {
        router.push("/pages/login");
        return;
      }

      toast.error(error?.data?.msg);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="max-w-[1100px] w-full mx-auto flex justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0 text-blue-600 pt-[8.5rem] pb-[4rem]">
      {isLoading && (
        <div className="rounded-[var(--r1)] p-8 flex flex-col items-center bg-white h-fit w-full sm:w-[450px] shadow-1">
          <p className="mb-4 text-center">Verifying email account</p>
          <div className="loader-2"></div>
        </div>
      )}

      {isSuccess ? (
        <div className="rounded-[var(--r1)] p-8 flex flex-col items-center bg-white h-fit w-full sm:w-[450px] shadow-1">
          <p className="mb-4 text-center">Email verification successful.</p>
          <Link
            href="/pages/login"
            className="relative bg-blue-600 text-white hover:bg-blue-500 rounded-[var(--r1)] h-[40px] w-[75px]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Login
            </span>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VerifyEmail;
