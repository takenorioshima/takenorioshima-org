import WorkType from "@/interfaces/work";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/constants";
import Layout from "@/layouts/default";
import { getAllWorks } from "@/lib/works";
import WorkViewer from "@/components/work-viewer";
import AppleMusicEmbed from "@/components/apple-music-embed";
import { flipWorksHeader } from "@/lib/flipWorksHeader";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import WorkHeader from "@/components/work-header";
import WorkRelatedPreview from "@/components/work-related-preview";

type Props = {
  work: WorkType;
  relatedWorks: WorkType[];
};

export default function Work({ work, relatedWorks }: Props) {
  const router = useRouter();
  if (!router.isFallback && !work?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    const intervalId = flipWorksHeader();
    return () => {
      clearInterval(intervalId);
    };
  }, [router.asPath]);

  const title = `${work.title} - ${SITE_NAME}`;
  const ogImage = work.cover ? work.cover : work.images[0];

  return (
    <Layout>
      <NextSeo
        title={title}
        description={work.excerpt}
        openGraph={{
          images: [
            {
              url: `/assets/works/${work.slug}/${ogImage}`,
            },
          ],
        }}
      />
      <WorkHeader title={work.title} tags={work.tags} />

      <div className="overflow-hidden">
        <div className="container max-w-(--breakpoint-xl) mx-auto">
          {work.images && !work.appleMusic && (
            <WorkViewer
              slug={work.slug}
              images={work.images}
              youTubeId={work.youTubeId}
              carouselDisabled={work.carouselDisabled}
            />
          )}
          {work.appleMusic && <AppleMusicEmbed id={work.appleMusic} />}
        </div>
      </div>

      {relatedWorks.length > 0 && (
        <section className="bg-gray-100 py-20 border-t border-slate-300">
          <div className="container max-w-(--breakpoint-xl) mx-auto px-3">
            <h3 className="text-xl font-bold mb-10">
              {work.tags.map((tag) => (
                <span className="inline-block rounded bg-slate-300 p-1 px-2 mx-1" key={tag}>
                  {tag}
                </span>
              ))}
              な
              <ruby className="font-bold tracking-wider relative">
                <span className="works-header-wrapper relative">
                  <span className="js-works-header-serve works-header active">仕</span>
                  <span className="absolute left-0 js-works-header-private works-header top-[-0.1em]">私</span>
                </span>
                事<rt className="font-light">しごと</rt>
              </ruby>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-5 lg:gap-5">
              {relatedWorks.map((w) => (
                <WorkRelatedPreview
                  title={w.title}
                  slug={w.slug}
                  images={w.images}
                  cover={w.cover}
                  youTubeId={w.youTubeId}
                  appleMusic={w.appleMusic}
                  tags={w.tags}
                  date={w.date}
                  key={w.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const allWorks = getAllWorks(["slug", "date", "cover", "images", "title", "tags", "youTubeId", "carouselDisabled"]);

  const work = allWorks.find((work) => work.slug === params.slug);

  const relatedWorks = allWorks.filter((w) => {
    if (w.slug === work?.slug) return false;
    return w.tags?.some((tag: string) => work?.tags?.includes(tag));
  });

  return {
    props: {
      work,
      relatedWorks,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllWorks(["slug"]).map((work) => {
      return {
        params: {
          slug: work.slug,
        },
      };
    }),
    fallback: false,
  };
}
