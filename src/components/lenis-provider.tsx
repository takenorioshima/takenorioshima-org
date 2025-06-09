import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import type { LenisScrollEvent } from "../../@types/lenis";
import { useRouter } from "next/router";

type LenisContextType = {
  scrollY: number;
  windowHeight: number;
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ scrollY: 0, windowHeight: 0, lenis: null });

export const useLenisScroll = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setwindowHeight] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    const handleRouteChange = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <LenisContext.Provider value={{ scrollY, windowHeight, lenis: lenisRef.current }}>{children}</LenisContext.Provider>
  );
};
