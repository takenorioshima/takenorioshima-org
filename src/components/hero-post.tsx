import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ title, date, excerpt, slug }: Props) => {
  return (
    <div data-aos="zoom-in">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className={`grid lg:grid-cols-5 items-center rounded-lg overflow-hidden bg-white drop-shadow-sm hover:shadow-xl transition-shadow duration-200 my-5 lg:my-10`}
      >
        <div className="lg:col-span-3">
          <CoverImage slug={slug} title={title} />
        </div>
        <div className="p-5 lg:col-span-2">
          <h3 className="mb-2 text-xl lg:text-3xl font-semibold leading-tight">{title}</h3>
          <div className="text-xs text-gray-500 mb-3">
            <DateFormatter dateString={date} />
          </div>
          <p className="text-sm">{excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default HeroPost;
