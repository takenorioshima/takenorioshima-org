import { getAllPosts } from "./lib/api";
import HeroPost from "../components/hero-post";
import PostPreview from "../components/post-preview";

export default async function Index() {
  const recentPosts = await getAllPosts();
  const heroPost = recentPosts[0];
  const morePosts = recentPosts.slice(1);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold tracking-tighter md:pr-8">
        <i className="bi-journals"></i> 最近の投稿
      </h2>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-10">
          {morePosts.map((post, index) => (
            <PostPreview key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
