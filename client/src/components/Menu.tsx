"use client";

import { forwardRef } from "react";

// ----- react-icons -----
import { GrClose } from "react-icons/gr";
interface MenuProps {
  hideMenu: () => void;
}

const Menu = forwardRef((props: MenuProps, ref: React.Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    className="fixed top-0 left-0 z-[-1] w-full h-full bg-[rgba(240,240,240,0.75)] flex items-center justify-center opacity-0"
  >
    <div className="p-8 w-[80%] h-[90%] bg-white rounded">
      <span>
        <GrClose
          className="text-2xl sm:hidden cursor-pointer"
          onClick={props.hideMenu}
        />
      </span>
    </div>
  </div>
));

export default Menu;
