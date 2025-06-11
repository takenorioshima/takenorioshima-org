import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroUnit from "@/components/hero-unit";
import HeroPost from "@/components/hero-post";
import { NextSeo } from "next-seo";
import Layout from "@/layouts/default";
import { getRecentPosts } from "@/lib/post";
import Post from "@/interfaces/post";
import Work from "@/interfaces/work";
import { useEffect } from "react";
import Link from "next/link";
import { getRecentWorks } from "@/lib/works";
import { flipWorksHeader } from "@/lib/flipWorksHeader";
import WorkPreview from "@/components/work-preview";
import AOS from "aos";

type Props = {
  posts: Post[];
  works: Work[];
};

export default function Index({ posts, works }: Props) {
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  useEffect(() => {
    document.querySelector("body")?.classList.add("home");

    const intervalId = flipWorksHeader();

    return () => {
      clearInterval(intervalId);
      document.querySelector("body")?.classList.remove("home");
    };
  }, []);

  return (
    <>
      <Layout>
        <NextSeo />
        <HeroUnit />
        <Container>
          <h2 className="text-xl font-bold tracking-tighter md:pr-8">
            <i className="bi-journals"></i> 最近の投稿
          </h2>
          {heroPost && (
            <HeroPost title={heroPost.title} date={heroPost.date} slug={heroPost.slug} excerpt={heroPost.excerpt} />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          {/* <div className="py-10 text-right">
            <Link
              href="/posts"
              className="rounded-full whitespace-nowrap bg-white p-3 px-5 shadow-sm transition hover:opacity-70"
            >
              <i className="bi bi-chevron-right"></i> もっと見る
            </Link>
          </div> */}
        </Container>
        <section className="bg-graph border-top">
          <div className="container max-w-(--breakpoint-xl) mx-auto px-3 relative z-10">
            <div className="flex pt-30 items-center justify-between">
              <h2 className="text-4xl lg:text-6xl">
                わたしの
                <ruby className="font-bold tracking-wider relative">
                  <span className="works-header-wrapper relative">
                    <span className="js-works-header-serve works-header active">仕</span>
                    <span className="absolute left-0 js-works-header-private works-header">私</span>
                  </span>
                  事<rt className="font-light">しごと</rt>
                </ruby>
              </h2>
              <Link
                href="/works"
                className="rounded-full whitespace-nowrap bg-white p-3 px-5 shadow-sm transition hover:opacity-70"
              >
                <i className="bi bi-chevron-right"></i> 一覧を見る
              </Link>
            </div>
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
                  youTubeId={work.youTubeId}
                  appleMusic={work.appleMusic}
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getRecentPosts(["title", "date", "slug", "coverImage", "excerpt"]);
  const works = getRecentWorks(["title", "date", "slug", "excerpt", "images", "tags", "cover"]);

  return {
    props: { posts, works },
  };
};
