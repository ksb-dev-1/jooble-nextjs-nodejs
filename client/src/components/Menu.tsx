"use client";

import { forwardRef } from "react";

// ----- react-icons -----
import { RiMenuFoldLine } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
interface MenuProps {
  hideMenu: () => void;
}

const Menu = forwardRef((props: MenuProps, ref: React.Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    className="fixed top-0 left-0 z-20 w-full h-full bg-[rgba(240,240,240,0.75)] flex items-center justify-center translate-x-[-100%] transition-all duration-300"
  >
    <div className="relative bg-white h-full w-full">
      <div className="border-b border-slate-300 h-[3.5rem] flex items-center cursor-pointer">
        <div
          className="relative h-[35px] w-[35px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer sm:hidden ml-4"
          onClick={props.hideMenu}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
            <MdMenuOpen />
          </span>
        </div>
      </div>

      {/* <button
        onClick={props.hideMenu}
        className="absolute top-4 right-4 bg-[tomato] cursor-pointer rounded-full h-[40px] w-[40px] hover:bg-[#ff856f]"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
          <RiMenuUnfold2Line />
        </span>
      </button> */}
    </div>
  </div>
));

export default Menu;
