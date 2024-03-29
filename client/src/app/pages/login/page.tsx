import Image from "next/image";
import Link from "next/link";
import JobSearch from "../../../../public/job-search-3.svg";

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] w-full pt-[4rem] mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {/* Image */}
      <div className="hidden lg:flex">
        <div>
          {/* <p className="font-bold text-4xl">Find your dream job now</p>
          <p className="mt-2 font-semibold">
            One of the best job portal for you to explore
          </p> */}
          {/* <div className="relative h-[300px] w-[500px] lg:ml-[-0.8rem] mt-16">
            <Image src={JobSearch} alt="job-search" fill priority />
          </div> */}
        </div>
      </div>
      {/* Form */}
      <form className="w-[500px] border border-[var(--gray-1)] rounded-[var(--radius-3)] p-8">
        <p className="font-bold text-2xl">Login</p>
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            name="email"
            className="border border-[var(--gray-1)] rounded mt-2 p-2 round"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="text"
            autoComplete="off"
            id="password"
            name="password"
            className="border border-[var(--gray-1)] rounded mt-2 p-2 round"
          />
        </div>
        <button
          type="submit"
          className="font-semibold border border-[var(--blue-2)] rounded mt-4 p-2 w-full bg-[var(--blue-2)] text-[var(--white-1)] hover:bg-[var(--blue-1)]"
        >
          Login
        </button>
        <p className="mt-4">
          Do not have an account?{" "}
          <Link href="/pages/register" className="text-[var(--blue-2)]">
            Register
          </Link>
        </p>
        <p className="mt-2">
          Forgot password?{" "}
          <Link href="#" className="text-[var(--blue-2)]">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
