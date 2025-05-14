import { getAllPostSlugs, getPostBySlug } from "@/lib/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostHeader from "@/components/post-header";
import Container from "@/components/container";
import Sidebar from "@/components/sidebar";
import ShareButtons from "@/components/share-butttons";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PostPageProps) {
  console.log(params);
  const data = getPostBySlug(params.slug);

  return (
    <article className="mb-20">
      <PostHeader
        title={(await data).title}
        coverImage={`/assets/posts/${(await data).slug}/cover.jpg`}
        date={(await data).date}
        modifiedDate={(await data).modifiedDate}
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
              <MDXRemote source={(await data).content} />
            </div>
            <ShareButtons title={(await data).title} slug={(await data).slug} />
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
