import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] w-full pt-[4rem] mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
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
          className="font-semibold border border-[var(--blue-1)] rounded mt-4 p-2 w-full bg-[var(--blue-1)] text-[var(--white-1)] hover:bg-[var(--blue-2)]"
        >
          Login
        </button>
        <p className="mt-4">
          Do not have an account?{" "}
          <Link href="/pages/register" className="text-[var(--blue-1)]">
            Register
          </Link>
        </p>
        <p className="mt-2">
          Forgot password?{" "}
          <Link href="#" className="text-[var(--blue-1)]">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
