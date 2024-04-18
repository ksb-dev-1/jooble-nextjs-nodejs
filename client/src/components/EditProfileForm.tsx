"use client";

import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  FormEvent,
  ChangeEvent,
} from "react";
import Image from "next/image";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUpload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// ----- redux
import { useEditProfileMutation } from "@/redux/slices/userApi";

interface UserProps {
  user: User;
}

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const EditProfileForm = forwardRef<HTMLDivElement, UserProps>(
  ({ user }, ref) => {
    const editFormContainerRef = useRef<HTMLDivElement>(null);
    const editFormRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(
      ref,
      () => editFormContainerRef.current as HTMLDivElement
    );

    const {
      image,
      first_name,
      last_name,
      location,
      mobile_no,
      available_to_join,
    } = user;

    const [values, setValues] = useState({
      image: image,
      first_name: first_name,
      last_name: last_name,
      location: location,
      mobile_no: mobile_no,
      available_to_join: available_to_join,
      password: "",
      confirmPassword: "",
    });
    const [available, setAvailable] = useState(
      available_to_join === "available" ? "available" : "not available"
    );
    const [onHoverImage, setOnHoverImage] = useState(false);
    const [editProfile, { isLoading, isError, isSuccess }] =
      useEditProfileMutation();

    // ----- Handle outside click -----
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        hideEditForm(e);
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    const hideEditForm = (e: any) => {
      if (
        (editFormContainerRef.current &&
          editFormRef.current &&
          editFormContainerRef.current.contains(e.target as Node) &&
          !editFormRef.current.contains(e.target as Node)) ||
        (editFormContainerRef.current &&
          closeBtnRef.current &&
          editFormRef.current &&
          editFormContainerRef.current.contains(e.target as Node) &&
          editFormRef.current.contains(e.target as Node) &&
          closeBtnRef.current.contains(e.target as Node))
      ) {
        editFormContainerRef.current.style.transform = "scale(0)";
        editFormContainerRef.current.style.opacity = "0";

        setValues({
          ...values,
          image,
          first_name,
          last_name,
          location,
          mobile_no,
          password: "",
          confirmPassword: "",
        });

        setAvailable(user.available_to_join);
      }
    };

    // ----- Handle form edit -----
    const handleEditProfile = async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("image", values.image);
      if (available_to_join) {
        formData.append("available_to_join", available_to_join);
      }
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("location", values.location);
      formData.append("mobile_no", values.mobile_no);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      try {
        const res = await editProfile(formData).unwrap();

        isError && toast.error(res.data.msg);
      } catch (err) {
        const error = err as ErrorProps;
        toast.error(error?.data?.msg);
      }
    };

    // ----- convert image to base64 -----
    const convertToBase64 = (image: any): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!(image instanceof Blob)) {
          reject(new Error("Input is not a Blob"));
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const handleImageChange = async (e: any) => {
      const base64Image = await convertToBase64(e.target.files[0]);
      setValues({ ...values, image: base64Image });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
      <div
        ref={editFormContainerRef}
        className="z-30 scale-0 opacity-0 fixed w-full h-full top-0 left-0 mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-0 pt-[8.5rem] pb-[4rem] bg-[rgba(0,0,0,0.75)] transition-opacity duration-300"
      >
        <div
          ref={editFormRef}
          className="relative max-w-[500px] w-[100%] rounded p-4 sm:p-8 bg-white shadow-1"
        >
          <span
            ref={closeBtnRef}
            className="absolute text-3xl -top-[15px] sm:top-4 right-[calc(50%-30px)] sm:right-4 text-white sm:text-red-500 cursor-pointer hover:rotate-[360deg] transition-all bg-red-500 sm:bg-red-100 rounded shadow-1 sm:shadow-none"
            onClick={(e: any) => hideEditForm(e)}
          >
            <IoMdClose />
          </span>
          <p className="font-bold text-lg sm:text-2xl mb-8 text-center mt-2 sm:mt-0">
            Update your <span className="text-blue-600">Jooble</span> profile
          </p>

          <form onSubmit={handleEditProfile}>
            <div className="flex items-center justify-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="relative cursor-pointer block w-[75px] sm:w-[100px] h-[75px] sm:h-[100px] rounded-full overflow-hidden border border-slate-400"
                onMouseOver={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}
              >
                {onHoverImage && (
                  <FaUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl text-slate-300" />
                )}
                {!onHoverImage && !values.image && (
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl text-slate-300" />
                )}
                {values.image && !onHoverImage && (
                  <Image
                    src={values.image}
                    alt="pic"
                    width={100}
                    height={100}
                  />
                )}
              </label>
            </div>

            <div className="flex items-center justify-center my-8">
              <div
                className="flex items-center cursor-pointer mr-4"
                onClick={() => {
                  setAvailable("available");
                  setValues({ ...values, available_to_join: "available" });
                }}
              >
                {available === "available" ? (
                  <span className="h-[17.5px] w-[17.5px] border border-blue-600 bg-blue-600 mr-2 rounded-full"></span>
                ) : (
                  <span className="h-[17.5px] w-[17.5px] border border-slate-400 mr-2 rounded-full"></span>
                )}
                <span className="text-sm">Available</span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setAvailable("not available");
                  setValues({ ...values, available_to_join: "not available" });
                }}
              >
                {available === "not available" ? (
                  <span className="h-[17.5px] w-[17.5px] border border-blue-600 bg-blue-600 mr-2 rounded-full"></span>
                ) : (
                  <span className="h-[17.5px] w-[17.5px] border border-slate-400 mr-2 rounded-full"></span>
                )}
                <span className="text-sm">Not Available</span>
              </div>
            </div>

            <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border">
              <div className="max-w-[50%] box-border">
                <input
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="max-w-[50%] box-border">
                <input
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border mt-4">
              <div className="max-w-[50%] box-border">
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="Location"
                />
              </div>
              <div className="max-w-[50%] box-border">
                <input
                  type="text"
                  name="mobile_no"
                  value={values.mobile_no}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="Mobile"
                />
              </div>
            </div>

            <span className="w-full h-[0.5px] inline-block bg-slate-300"></span>

            <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border mt-4 ">
              <div className="max-w-[50%] box-border">
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="max-w-[50%] box-border">
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                  onChange={handleChange}
                  placeholder="Confirm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-[41.6px] sm:h-[49.6px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Save"}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default EditProfileForm;
