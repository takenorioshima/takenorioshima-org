import { AppProps } from "next/app";
import { useEffect } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from "next/script";
import "../styles/index.css";
import "../styles/prism.css";
import React from "react";
import { DefaultSeo } from "next-seo";
import { SITE_NAME, AUTHOR_PROFILES, HOME_OG_IMAGE_URL } from "../lib/constants";

export default function MyApp({ Component, pageProps }: AppProps) {
  const description = AUTHOR_PROFILES.description;

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
      />
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://www.instagram.com/embed.js" />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
