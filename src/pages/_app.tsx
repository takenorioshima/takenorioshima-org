import { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/index.css";
import "@/styles/prism.css";
import "@/styles/lenis.css";
import React, { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import { SITE_NAME, AUTHOR_PROFILES, HOME_OG_IMAGE_URL } from "../lib/constants";
import Lenis from "lenis";

export default function MyApp({ Component, pageProps }: AppProps) {
  const description = AUTHOR_PROFILES.description;

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    lenis.on("scroll", () => {
      console.log("scroll");
    });
  }, []);

  return (
    <>
      <DefaultSeo
        defaultTitle={SITE_NAME}
        description={description}
        twitter={{
          handle: "@takenorioshima",
          site: "@takenorioshima",
          cardType: "summary_large_image",
        }}
        openGraph={{
          type: "website",
          images: [
            {
              url: HOME_OG_IMAGE_URL,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "google-site-verification",
            content: process.env.NEXT_PUBLIC_GOOGLE_SITE_VARIFICATION as string,
          },
        ]}
      />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
