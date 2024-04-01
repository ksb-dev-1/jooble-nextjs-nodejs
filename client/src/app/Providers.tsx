"use client";

// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ToastContainer autoClose={5000} position="top-center" />
      {children}
    </div>
  );
};

export default Providers;
