import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--blue-1)] z-10 px-4 lg:px-8 xl:px-0 border-[--white-1] border-b">
      <div className="max-w-[1100px] w-[100%] h-[4rem] mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-[var(--white-1)] font-bold text-3xl cursor-pointer no-underline"
        >
          <span>J</span>
          <span className="inline-block h-[17.5px] w-[17.5px] rounded-full bg-[var(--white-1)] mr-[2px]"></span>
          <span className="inline-block h-[17.5px] w-[17.5px] rounded-full bg-[var(--white-1)]"></span>
          <span>ble</span>
        </Link>

        {/* Options */}
        <div>
          <Link
            href="/pages/login"
            className="mr-4 font-semibold border-[1px] border-[var(--white-1)] rounded-[25px] px-4 py-2 text-[var(--white-1)] hover:bg-[var(--blue-2)]"
          >
            Login
          </Link>
          <Link
            href="/pages/register"
            className="border-[1px] font-semibold border-[var(--white-1)] rounded-[25px] px-4 py-2 bg-[var(--white-1)] text-[var(--blue-1)] hover:bg-[var(--white-2)]"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
