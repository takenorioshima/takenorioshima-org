import { getAllPostSlugs, getPostBySlug } from "@/lib/api";
import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/container";
import Sidebar from "@/components/sidebar";
import ShareButtons from "@/components/share-butttons";
import markdownToHtml from "@/lib/markdown-to-html";
import Image from "next-export-optimize-images/image";
import DateFormatter from "@/components/date-formatter";
import PostHeaderToc from "@/components/post-header-toc";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  const coverImage = `/images/${data.slug}/cover.jpg`;
  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      images: [coverImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  const coverImage = `/images/${data.slug}/cover.jpg`;

  const content = await markdownToHtml(data.content || "");

  return (
    <article className="mb-20">
      <div className="post-header relative flex items-center md:min-h-[500px] pt-12 js-header-trigger">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Image
            src={coverImage}
            alt={`Cover Image for ${data.title}`}
            className="block w-full h-full object-cover object-center"
            title={data.title}
            fill
          />
        </div>
        <div className="container max-w-(--breakpoint-lg) mx-auto flex flex-col h-full justify-center px-4 py-12">
          <h1 className="text-white text-4xl md:text-7xl lg:text-7xl font-semibold tracking-tighter leading-tight mb-12 md:text-left">
            {data.title}
          </h1>
          <div className="flex justify-between relative">
            <DateFormatter dateString={data.date} modifiedDateString={data.modifiedDate} className="text-white" />
            <PostHeaderToc />
          </div>
        </div>
      </div>
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
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <ShareButtons title={data.title} slug={data.slug} />
          </div>
          <div className="lg:col-span-2 px-4">
            <Sidebar />
          </div>
        </div>
      </Container>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug: string) => ({ params: { slug } }));
}
