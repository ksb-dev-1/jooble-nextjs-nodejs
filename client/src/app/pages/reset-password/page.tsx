import { Suspense } from "react";

// components
import ResetPasswordForm from "@/components/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
