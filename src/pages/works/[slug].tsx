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
        <div className="py-5 border-b border-slate-300 flex items-center place-content-between">
          <div>
            <div className="mb-2">しごと</div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tighter leading-tight mb-6 md:text-left">
              {work.title}
            </h1>
          </div>
          {work.tags && (
            <div className="text-right text-slate-700 text-sm">
              <i className="bi bi-tag mr-1"></i>
              {work.tags.map((tag) => {
                return tag;
              })}
            </div>
          )}
        </div>
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
