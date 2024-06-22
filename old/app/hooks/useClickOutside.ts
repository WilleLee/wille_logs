import React, { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => any,
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // console.log("ref current : ", ref.current);
        // console.log("event target : ", e.target);
        handler(e);
      }
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
}
