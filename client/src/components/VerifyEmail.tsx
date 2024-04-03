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
    <div className="max-w-[1100px] w-full mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {isLoading && (
        <div className="border border-slate-300 rounded px-8 py-4 flex flex-col items-center">
          <p className="mb-4">Verifying email account</p>
          <div className="loader-2"></div>
        </div>
      )}

      {isSuccess ? (
        <div className="border border-slate-300 rounded px-8 py-4 flex flex-col items-center">
          <p className="mb-2">Email account verification successful.</p>
          <Link href="/pages/login" className="text-blue-500">
            Log in to your account
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VerifyEmail;
