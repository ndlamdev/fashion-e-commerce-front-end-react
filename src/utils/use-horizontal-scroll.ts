/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:10PM - 07/03/2025
 * User: lam-nguyen
 **/
import { useEffect } from "react";

export function useHorizontalScroll<T extends HTMLElement | null>(ref: T | null): T | null {
  useEffect(() => {
    if (ref) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        ref.scrollTo({
          left: ref.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      ref.addEventListener("wheel", onWheel);
      return () => ref.removeEventListener("wheel", onWheel);
    }
  }, [ref]);
  return ref;
}
