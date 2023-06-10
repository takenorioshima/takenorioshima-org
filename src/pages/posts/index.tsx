import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import Layout from "../../components/layouts/posts";
import { getAllPosts } from "../../lib/api";
import { NextSeo } from "next-seo";
import Post from "../../interfaces/post";
import { SITE_NAME } from "../../lib/constants";

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props) {
  const title = `最近の投稿 - ${SITE_NAME}`;
  return (
    <Layout>
      <NextSeo title={title} />
      <Container>
        <h2 className="text-2xl font-bold tracking-tighter md:pr-8 py-5">
          <i className="bi bi-journals"></i> 最近の投稿
        </h2>
        <MoreStories posts={posts} />
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug", "coverImage", "excerpt", "content"]);

  return {
    props: { posts },
  };
};
