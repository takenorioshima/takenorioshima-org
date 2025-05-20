import { SITE_NAME, AUTHOR_PROFILES, HOME_OG_IMAGE_URL } from "./lib/constants";
import "./css/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import MainWrapper from "@/components/main-wrapper";
import EmbedScripts from "@/components/embed-scripts";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s - " + SITE_NAME,
    default: SITE_NAME, // a default is required when creating a template
  },
  description: AUTHOR_PROFILES.description,
  openGraph: {
    images: ["/images/ogp.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <EmbedScripts />
        <Footer />
      </body>
    </html>
  );
}
