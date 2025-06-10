import { NextSeo } from "next-seo";
import Layout from "@/layouts/default";
import { useEffect } from "react";
import { getAllWorks } from "@/lib/works";
import Work from "@/interfaces/work";
import WorkPreview from "@/components/work-preview";
import { flipWorksHeader } from "@/lib/flipWorksHeader";

type Props = {
  works: Work[];
};

export const getStaticProps = async () => {
  const works = getAllWorks(["slug", "date", "images", "cover", "date", "title", "tags"]);
  return {
    props: { works },
  };
};

export default function Works({ works }: Props) {
  useEffect(() => {
    const intervalId = flipWorksHeader();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Layout>
        <NextSeo />
        <div className="container max-w-(--breakpoint-xl) mx-auto px-4">
          <h2 className="text-5xl md:text-7xl text-center pt-30">
            わたしの
            <ruby className="font-bold tracking-wider relative">
              <span className="works-header-wrapper relative">
                <span className="js-works-header-serve works-header active">仕</span>
                <span className="absolute left-0 js-works-header-private works-header">私</span>
              </span>
              事<rt className="font-light">しごと</rt>
            </ruby>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-10 py-20">
            {works.map((work) => (
              <WorkPreview
                title={work.title}
                slug={work.slug}
                key={work.slug}
                cover={work.cover}
                images={work.images}
                date={work.date}
                tags={work.tags}
                youtube={work.youtube}
                appleMusic={work.appleMusic}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
