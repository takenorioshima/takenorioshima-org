import { useRouter } from "next/router";
import { useEffect } from "react";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layouts/posts";
import Sidebar from "../../components/sidebar";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { SITE_NAME } from "../../lib/constants";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

declare global {
  interface Window {
    twttr: { widgets: { load: () => void } };
    instgrm: { Embeds: { process: () => void } };
  }
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [post]);

  const title = `${post.title} - ${SITE_NAME}`;

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-20">
            <Head>
              <title>{title}</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} />
            <Container>
              <div className="lg:grid grid-cols-7 gap-4">
                <div className="lg:col-span-5 mb-20 lg:mb-0">
                  <PostBody content={post.content} />
                </div>
                <div className="lg:col-span-2 px-4">
                  <Sidebar />
                </div>
              </div>
            </Container>
          </article>
        </>
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
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "author", "content", "ogImage", "coverImage"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
