import { getAllPostSlugs, getPostBySlug } from "@/lib/api";
import PostHeader from "@/components/post-header";
import Container from "@/components/container";
import Sidebar from "@/components/sidebar";
import ShareButtons from "@/components/share-butttons";
import markdownToHtml from "@/lib/markdown-to-html";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  const content = await markdownToHtml(data.content || "");

  return (
    <article className="mb-20">
      <PostHeader
        title={data.title}
        coverImage={`/images/${data.slug}/cover.jpg`}
        date={data.date}
        modifiedDate={data.modifiedDate}
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
