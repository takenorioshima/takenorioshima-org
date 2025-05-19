"use client";

import { usePathname } from "next/navigation";
import HeroUnit from "@/components/hero-unit";
import { useEffect } from "react";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Observe page-header visibility, change background color of global header.
    const globalNav = document.querySelector(".global-nav");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 1.0],
    };
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(".js-header-trigger");
    if (target) {
      observer.observe(target);
    }
    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          globalNav?.classList.add("is-scrolled", "bg-white", "shadow-md");
        } else {
          globalNav?.classList.remove("is-scrolled", "bg-white", "shadow-md");
        }
      });
    }
  }, [pathname]);

  return (
    <main className={isHome ? "min-h-screen" : ""}>
      {isHome && <HeroUnit />}
      {children}
    </main>
  );
}
