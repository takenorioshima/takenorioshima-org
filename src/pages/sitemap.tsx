import { generateSitemapXml } from "../lib/api";
import Head from "next/head";
import { NextPage } from "next";

const Sitemap: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
    </>
  );
};
export default Sitemap;

export const getStaticProps = async () => {
  await generateSitemapXml();
  return { props: {} };
};
