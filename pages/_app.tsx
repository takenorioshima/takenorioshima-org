import { AppProps } from "next/app";
import { useEffect } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const handleScroll = () => {
    const globalNav = document.querySelector(".global-nav");
    if (window.pageYOffset > 500) {
      globalNav.classList.add("is-scrolled", "bg-white");
    } else {
      globalNav.classList.remove("is-scrolled", "bg-white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
