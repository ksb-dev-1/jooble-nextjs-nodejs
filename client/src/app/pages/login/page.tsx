import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-[4rem] px-4 sm:px-8 xl:px-0">
      <p className="font-bold text-xl sm:text-3xl mb-8 text-center">
        Log in to <span className="text-blue-500">Jooble</span> account
      </p>
      {/* Form */}
      <form className="max-w-[500px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            name="email"
            className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            autoComplete="off"
            id="password"
            name="password"
            className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="h-[42px] font-semibold rounded mt-4 p-2 w-full bg-blue-500 text-white hover:bg-blue-400 flex items-center justify-center"
        >
          Login
        </button>
        <p className="mt-2">
          <span>Don't have an account? </span>
          <Link href="#" className="text-blue-500">
            Register
          </Link>
        </p>
        <p className="mt-2">
          <span>Forgot your password? </span>
          <Link href="#" className="text-blue-500">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
