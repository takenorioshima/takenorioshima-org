import Link from "next/link";

type Props = {
  title: string;
  slug: string;
};

const WorkPreview = ({ title, slug }: Props) => {
  return (
    <Link
      as={`/works/${slug}`}
      href="/works/[slug]"
      className={`rounded-lg overflow-hidden bg-white drop-shadow-sm hover:shadow-xl transition-shadow duration-200`}
    >
      <div className="p-5">
        <h3 className="mb-2 text-xl lg:text-2xl font-semibold leading-tight">{title}</h3>
      </div>
    </Link>
  );
};

export default WorkPreview;
