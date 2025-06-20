import WorkType from "@/interfaces/work";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/constants";
import Layout from "@/layouts/default";
import { getWorkBySlug, getAllWorks } from "@/lib/works";
import WorkViewer from "@/components/work-viewer";
import YoutubeEmbed from "@/components/youtube-embed";
import AppleMusicEmbed from "@/components/apple-music-embed";
import { flipWorksHeader } from "@/lib/flipWorksHeader";
import { useEffect } from "react";

type Props = {
  work: WorkType;
};

export default function Work({ work }: Props) {
  const router = useRouter();
  if (!router.isFallback && !work?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => flipWorksHeader(), [router.asPath]);

  const title = `${work.title} - ${SITE_NAME}`;

  return (
    <Layout>
      <div className="container max-w-(--breakpoint-xl) mx-auto px-3">
        <div className="pt-20 border-b border-slate-300 flex items-center place-content-between">
          <div>
            <div className="mb-2">
              わたしの
              <ruby className="font-bold tracking-wider relative">
                <span className="works-header-wrapper relative">
                  <span className="js-works-header-serve works-header active">仕</span>
                  <span className="absolute left-0 js-works-header-private works-header">私</span>
                </span>
                事<rt className="font-light">しごと</rt>
              </ruby>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tighter leading-tight mb-6 md:text-left">
              {work.title}
            </h1>
          </div>
          {work.tags && (
            <div className="text-right text-nowrap">
              {work.tags.map((tag) => (
                <span className="inline-block rounded bg-slate-300 p-1 px-2 text-xs mr-1">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="container max-w-(--breakpoint-xl) mx-auto">
          {work.images && !work.youtube && !work.appleMusic && <WorkViewer slug={work.slug} images={work.images} />}
          {work.youtube && <YoutubeEmbed id={work.youtube} />}
          {work.appleMusic && <AppleMusicEmbed id={work.appleMusic} />}
        </div>
      </div>
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
