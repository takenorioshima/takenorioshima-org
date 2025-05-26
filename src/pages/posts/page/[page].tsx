import { getAllPosts } from "../../../lib/api";
import type Post from "../../../interfaces/post";
import Layout from "../../../components/layouts/default";
import { NextSeo } from "next-seo";
import Container from "../../../components/container";
import MoreStories from "../../../components/more-stories";
import { SITE_NAME } from "../../../lib/constants";
import Pagination from "../../../components/pagination";

const pageSize: number = 8;

const range = (start: number, end: number, length = end - start + 1) => {
  return Array.from({ length }, (_, i) => start + i);
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  const count = posts.length;
  const paths = range(1, Math.ceil(count / pageSize)).map((i) => ({
    params: { page: `${i}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    page: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const currentPage = Number(params.page);
  const posts = getAllPosts(["title", "date", "slug", "excerpt", "content"]);
  const publishedPosts = posts.filter((post) => !post.slug.match(/^\+/));

  const pages = range(1, Math.ceil(publishedPosts.length / pageSize));
  const slicedPosts = publishedPosts.slice(pageSize * (currentPage - 1), pageSize * currentPage);

  return {
    props: {
      posts: slicedPosts,
      pages,
      currentPage,
    },
  };
}

type Props = {
  posts: Post[];
  pages: number[];
  currentPage: number;
};

export default function Page({ posts, pages, currentPage }: Props) {
  const title = `投稿の一覧 - ${SITE_NAME}`;
  return (
    <Layout>
      <NextSeo title={title} />
      <Container>
        <h2 className="text-2xl font-bold tracking-tighter md:pr-8 py-5">
          <i className="bi bi-journals"></i> 投稿の一覧
        </h2>
        <MoreStories posts={posts} />
        <Pagination pages={pages} currentPage={currentPage} />
      </Container>
    </Layout>
  );
}
