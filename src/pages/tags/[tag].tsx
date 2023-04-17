import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Layout from "../../components/layouts/posts";
import { NextSeo } from "next-seo";
import MoreStories from "../../components/more-stories";
import Container from "../../components/container";
import Post from "../../interfaces/post";
import { getAllPosts, getTaggedPosts } from "../../lib/api";

type Props = {
  posts: Post[];
  tag: string;
};

export default function Tags({ posts, tag }: Props) {
  return (
    <>
      <Layout>
        <NextSeo />
        <Container>
          <h2 className="text-2xl font-bold tracking-tighter md:pr-8 py-5">
            <i className="bi bi-journals"></i> タグ: {tag}
          </h2>
          <MoreStories posts={posts} />
        </Container>
      </Layout>
    </>
  );
}

const postsDirectory = join(process.cwd(), "src/data/posts");

type Params = {
  params: {
    tag: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const tag = params.tag;
  const posts = getTaggedPosts(tag);

  return {
    props: { posts, tag },
  };
};

export const getStaticPaths = () => {
  const posts = getAllPosts(["tags"]);
  let allTags = new Array();
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      allTags.push(tag);
    });
  });
  const tags = Array.from(new Set(allTags));
  const paths = tags.map((tag) => ({ params: { tag } }));

  return {
    paths,
    fallback: false,
  };
};
