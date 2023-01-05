import { AppProps } from "next/app";
import { useEffect } from "react";
import Script from "next/script";
import "../styles/index.css";
import "../styles/prism.css";

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
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://www.instagram.com/embed.js" />
      <Component {...pageProps} />
    </>
  );
}
