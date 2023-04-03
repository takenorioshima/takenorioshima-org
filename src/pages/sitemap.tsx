import { generateSitemapXml } from "../lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Sitemap() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/404");
  }, []);
  return null;
}

export const getStaticProps = async () => {
  await generateSitemapXml();
  return { props: {} };
};
