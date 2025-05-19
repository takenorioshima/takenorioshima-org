"use client";

import Script from "next/script";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr: { widgets: { load: () => void } };
    instgrm: { Embeds: { process: () => void } };
  }
}

export const EmbedScripts = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [pathname]);

  return (
    <>
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://www.instagram.com/embed.js" />
    </>
  );
};

export default EmbedScripts;
