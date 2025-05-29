import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroUnit from "@/components/hero-unit";
import HeroPost from "@/components/hero-post";
import { NextSeo } from "next-seo";
import Layout from "@/components/layouts/default";
import { getRecentPosts } from "@/lib/api";
import Post from "@/interfaces/post";
import { useEffect } from "react";

type Props = {
  recentPosts: Post[];
};

export default function Index({ recentPosts }: Props) {
  const heroPost = recentPosts[0];
  const morePosts = recentPosts.slice(1);

  useEffect(() => {
    document.querySelector("body")?.classList.add("home");
  }, []);

  return (
    <>
      <Layout>
        <NextSeo />
        <HeroUnit />
        <Container>
          <h2 className="text-2xl font-bold tracking-tighter md:pr-8">
            <i className="bi-journals"></i> 最近の投稿
          </h2>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const recentPosts = getRecentPosts(["title", "date", "slug", "coverImage", "excerpt"]);

  return {
    props: { recentPosts },
  };
};
