import { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        console.log(ref.current);
        console.log(e.target);
        handler();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handler]);
}
