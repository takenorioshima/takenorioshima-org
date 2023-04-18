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
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { SITE_NAME } from "../../lib/constants";
import { NextSeo } from "next-seo";

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

    // Observe page-header visibility, change background color of global header.
    const globalNav = document.querySelector(".global-nav");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 1.0],
    };
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(".post-header");
    if (target) {
      observer.observe(target);
    }
    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          globalNav?.classList.add("is-scrolled", "bg-white");
        } else {
          globalNav?.classList.remove("is-scrolled", "bg-white");
        }
      });
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
            <NextSeo
              title={title}
              description={post.excerpt}
              openGraph={{
                images: [
                  {
                    url: post.coverImage,
                  },
                ],
              }}
            />
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
  const post = getPostBySlug(params.slug, ["title", "date", "excerpt", "slug", "content", "coverImage"]);
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
