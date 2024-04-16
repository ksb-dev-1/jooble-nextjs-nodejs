"use client";

import { useState, useEffect, RefObject } from "react";

export const useHandleHeaderScroll = (
  headerRef: RefObject<HTMLDivElement>,
  headerInnerRef: RefObject<HTMLDivElement>
): void => {
  let [position, setPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollpos = window.scrollY;

      if (position > currentScrollpos) {
        headerRef.current!.style.transform = "translateY(0%)";
        headerRef.current!.style.boxShadow = "none";
        // setTimeout(() => {
        //   headerInnerRef.current!.style.transform = "translateY(0%)";
        // }, 300);
      } else {
        // headerInnerRef.current!.style.transform = "translateY(-150%)";
        // headerRef.current!.style.transform = "translateY(-150%)";
        headerRef.current!.style.boxShadow =
          "0px 6px 12px rgba(30, 10, 58, 0.04)";
      }
      setPosition(currentScrollpos);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [position, headerRef, headerInnerRef]);
};
