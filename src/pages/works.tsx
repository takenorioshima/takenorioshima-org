import { getAllWorks } from "../lib/api";
import Layout from "../components/layout";
import Work from "../interfaces/work";
import Head from "next/head";
import WorksList from "../components/works-list";
import { SITE_NAME } from "../lib/constants";

type Props = {
  works: Work[];
};

function Works({ works }: Props) {
  return (
    <Layout>
      <Head>
        <title>WORKS - {SITE_NAME}</title>
      </Head>
      {works.length > 0 && <WorksList works={works} />}
    </Layout>
  );
}
export default Works;

export const getStaticProps = async () => {
  const works = getAllWorks([
    "title",
    "date",
    "slug",
    "content",
    "tags",
    "ogImage",
    "coverImage",
  ]);
  return {
    props: { works },
  };
};
