import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import { Post } from "@/lib/types";

type PostPreviewProps = {
  post: Post;
  index?: number;
};

const PostPreview = ({ post, index = 0 }: PostPreviewProps) => {
  const colClass = index < 2 ? "col-span-3" : "col-span-2";
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`${colClass} rounded-lg overflow-hidden bg-white drop-shadow-sm hover:shadow-xl transition-shadow duration-200`}
    >
      <div className="">
        <CoverImage slug={post.slug} title={post.title} />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl lg:text-2xl font-semibold leading-tight">{post.title}</h3>
        <div className="text-xs text-gray-500 mb-3">
          <DateFormatter dateString={post.date} />
        </div>
        <p className="text-sm">{post.excerpt}</p>
      </div>
    </Link>
  );
};

export default PostPreview;
