import { Suspense } from "react";

// components
import VerifyEmail from "@/components/VerifyEmail";

const page: React.FC = () => {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
};

export default page;
