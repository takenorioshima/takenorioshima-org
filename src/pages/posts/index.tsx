import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import Layout from "../../components/layouts/posts";
import { getAllPosts } from "../../lib/api";
import { NextSeo } from "next-seo";
import Post from "../../interfaces/post";
import Footer from "../../components/footer";

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props) {
  return (
    <>
      <Layout>
        <NextSeo />
        <Container>
          <h2 className="text-2xl font-bold tracking-tighter md:pr-8 py-5">
            <i className="bi bi-journals"></i> 最近の投稿
          </h2>
          <MoreStories posts={posts} />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};
