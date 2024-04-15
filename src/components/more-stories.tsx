import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  const publishedPosts = posts.filter((post) => !post.slug.match(/^\+/));
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-10">
        {publishedPosts.map((post, index) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={"/assets/blog/" + post.slug + "/cover.jpg"}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
