"use client";

// 3rd party libraries
// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// react-redux
import { Provider } from "react-redux";

import store from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} position="top-center" />
      {children}
    </Provider>
  );
};

export default Providers;
