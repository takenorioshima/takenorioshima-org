import WorkType from "../../interfaces/work";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { SITE_NAME } from "../../lib/constants";
import Layout from "../../components/layouts/default";
import Container from "../../components/container";
import { getWorkBySlug, getAllWorks } from "../../lib/works";
import WorkViewer from "../../components/work-viewer";

type Props = {
  work: WorkType;
};

export default function Work({ work }: Props) {
  const router = useRouter();
  if (!router.isFallback && !work?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `${work.title} - ${SITE_NAME}`;

  return (
    <Layout>
      <Container>
        <h1>{work.title}</h1>
        {work.images && <WorkViewer slug={work.slug} images={work.images} />}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const work = getWorkBySlug(params.slug);

  return {
    props: {
      work: {
        ...work,
      },
    },
  };
}

export async function getStaticPaths({ params }: Params) {
  const works = getAllWorks();

  return {
    paths: works.map((work) => {
      return {
        params: {
          slug: work.slug,
        },
      };
    }),
    fallback: false,
  };
}
