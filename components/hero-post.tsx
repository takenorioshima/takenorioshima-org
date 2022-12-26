import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <section className="my-5 lg:my-10 bg-white rounded-lg overflow-hidden drop-shadow">
      <div className="lg:grid grid-cols-5 items-center">
        <div className="lg:col-span-3">
          <CoverImage title={title} src={coverImage} slug={slug} />
        </div>
        <div className="p-5 lg:col-span-2">
          <div>
            <h3 className="mb-2 text-xl lg:text-3xl font-semibold leading-tight">
              <Link
                as={`/posts/${slug}`}
                href="/posts/[slug]"
                className="hover:underline"
              >
                {title}
              </Link>
            </h3>
            <div className="mb-4 text-xs text-gray-500">
              <DateFormatter dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-sm">{excerpt}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
