import { Suspense } from "react";

// components
import VerifyEmail from "@/components/VerifyEmail";

const VerifyEmailPage: React.FC = () => {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
