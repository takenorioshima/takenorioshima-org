import WorkType from "@/interfaces/work";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/constants";
import Layout from "@/layouts/default";
import { getWorkBySlug, getAllWorks } from "@/lib/works";
import WorkViewer from "@/components/work-viewer";
import AppleMusicEmbed from "@/components/apple-music-embed";
import { flipWorksHeader } from "@/lib/flipWorksHeader";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import WorkHeader from "@/components/work-header";

type Props = {
  work: WorkType;
};

export default function Work({ work }: Props) {
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
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const work = getWorkBySlug(params.slug, [
    "slug",
    "date",
    "cover",
    "images",
    "title",
    "tags",
    "youTubeId",
    "carouselDisabled",
  ]);

  return {
    props: {
      work: {
        ...work,
      },
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
