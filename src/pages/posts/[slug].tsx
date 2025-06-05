import { useRouter } from "next/router";
import { FC, ImgHTMLAttributes, Fragment, createElement, useEffect, AnchorHTMLAttributes } from "react";
import Script from "next/script";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostHeader from "@/components/post-header";
import Layout from "@/layouts/default";
import Sidebar from "@/components/sidebar";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import PostTitle from "@/components/post-title";
import markdownToHtml from "@/lib/markdownToHtml";
import type PostType from "@/interfaces/post";
import { SITE_NAME } from "@/lib/constants";
import { NextSeo } from "next-seo";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import Image from "next-export-optimize-images/image";
import Link from "next/link";
import ShareButtons from "@/components/share-butttons";

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

const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: CustomLink,
        img: CustomImage,
      },
    })
    .processSync(content).result;
};

const CustomLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children }) => {
  return href?.startsWith("/") ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
};

const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src = "", alt = "" }) => {
  return <Image className="rounded-sm shadow-sm" src={src} alt={alt} width="704" height="470" />;
};

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

  const coverImageSrc = `/assets/posts/${router.query.slug}/cover.jpg`;

  return (
    <Layout preview={preview}>
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://www.instagram.com/embed.js" />
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
                    url: coverImageSrc,
                  },
                ],
              }}
            />
            <PostHeader
              title={post.title}
              coverImage={coverImageSrc}
              date={post.date}
              modifiedDate={post.modifiedDate}
            />
            <Container>
              <div className="lg:grid grid-cols-7 gap-4">
                <div className="lg:col-span-5 mb-20 lg:mb-0">
                  <div
                    className="
                      max-w-full prose
                      prose-h2:font-semibold
                      prose-p:leading-7
                      prose-code:before:hidden prose-code:after:hidden
                      js-toc-content"
                  >
                    {toReactNode(post.content)}
                  </div>
                  <ShareButtons title={post.title} slug={post.slug} />
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
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "modifiedDate",
    "excerpt",
    "slug",
    "content",
    "coverImage",
  ]);
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
