"use client";

import { usePathname } from "next/navigation";
import HeroUnit from "@/components/hero-unit";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={isHome ? "min-h-screen" : ""}>
      {isHome && <HeroUnit />}
      {children}
    </main>
  );
}
