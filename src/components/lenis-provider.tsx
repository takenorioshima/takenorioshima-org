import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import type { LenisScrollEvent } from "../../@types/lenis";

type LenisContextType = {
  scrollY: number;
  windowHeight: number;
};

const LenisContext = createContext<LenisContextType>({ scrollY: 0, windowHeight: 0 });

export const useLenisScroll = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setwindowHeight] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    lenisRef.current = lenis;

    const handleScroll = (e: LenisScrollEvent) => {
      setScrollY(e.animatedScroll);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      setwindowHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return <LenisContext.Provider value={{ scrollY, windowHeight }}>{children}</LenisContext.Provider>;
};
