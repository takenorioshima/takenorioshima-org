import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  index: number;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  index,
}: Props) => {
  const colClass = index < 2 ? "col-span-3" : "col-span-2";
  return (
    <div
      className={`${colClass} rounded-lg overflow-hidden bg-white drop-shadow`}
    >
      <div className="">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl lg:text-2xl font-semibold leading-tight">
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        <div className="text-xs text-gray-500 mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm">{excerpt}</p>
      </div>
    </div>
  );
};

export default PostPreview;
