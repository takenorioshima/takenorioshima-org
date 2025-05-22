import Container from "../../components/container";
import { NextSeo } from "next-seo";
import Layout from "../../components/layouts/default";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { getAllWorks } from "../../lib/works";
import Work from "../../interfaces/work";
import WorkPreview from "../../components/work-preview";

type Props = {
  works: Work[];
};

export const getStaticProps = async () => {
  const works = getAllWorks();
  return {
    props: { works },
  };
};

export default function Works({ works }: Props) {
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <NextSeo />
        <Container>
          <h2 className="text-2xl font-bold tracking-tighter md:pr-8">
            <i className="bi-journals"></i> Works
          </h2>
          {works.map((work) => (
            <WorkPreview title={work.title} slug={work.slug} key={work.slug} />
          ))}
        </Container>
        <Footer />
      </Layout>
    </>
  );
}
