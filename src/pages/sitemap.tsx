import { generateSitemapXml } from "../lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Sitemap() {
  return null;
}

export const getStaticProps = async () => {
  await generateSitemapXml();
  return { notFound: true };
};
