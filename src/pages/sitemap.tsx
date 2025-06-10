import { generateSitemapXml } from "../lib/post";

export default function Sitemap() {
  return null;
}

export const getStaticProps = async () => {
  await generateSitemapXml();
  return { notFound: true };
};
