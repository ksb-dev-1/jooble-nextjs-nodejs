import Image from "next/image";
import Link from "next/link";
import JobIcon from "../../public/job-3.svg";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--blue-2)] z-10 px-4 lg:px-8 xl:px-0 border-[--white-1] border-b">
      <div className="max-w-[1100px] w-[100%] h-[4rem] mx-auto flex items-center justify-between">
        {/* Job Icon */}
        <Link
          href="/"
          className="flex items-center cursor-pointer no-underline"
        >
          {/* <div className="h-[35px] w-[35px] bg-[var(--blue-2)] relative rounded-full mr-2">
            <Image
              src={JobIcon}
              alt="job-icon"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              height={20}
              width={20}
            />
          </div> */}
          <div className="text-[var(--white-1)] font-bold text-3xl">
            <span>J</span>
            <span className="inline-block h-[15px] w-[15px] rounded-full bg-[var(--white-1)] mr-[2px]"></span>
            <span className="inline-block h-[15px] w-[15px] rounded-full bg-[var(--white-1)]"></span>
            <span>ble</span>
          </div>
        </Link>
        {/* Options */}
        <div>
          <Link
            href="/pages/login"
            className="mr-4 font-semibold border-[1px] border-[var(--white-1)] rounded-[25px] px-4 py-2 text-[var(--white-1)]"
          >
            Login
          </Link>
          <Link
            href="/pages/register"
            className="border-[1px] font-semibold border-[var(--white-1)] rounded-[25px] px-4 py-2 bg-[var(--white-1)] text-[var(--blue-2)]"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
