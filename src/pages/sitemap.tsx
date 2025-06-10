import { generateSitemapXml } from "../lib/sitemap";

export default function Sitemap() {
  return null;
}

export const getStaticProps = async () => {
  await generateSitemapXml();
  return { notFound: true };
};
