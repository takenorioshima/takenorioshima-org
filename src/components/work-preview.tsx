import Link from "next/link";
import Image from "next-export-optimize-images/image";

type Props = {
  title: string;
  slug: string;
  images?: string[];
  tags?: string[];
};

const WorkPreview = ({ title, slug, images, tags }: Props) => {
  return (
    <Link
      as={`/works/${slug}`}
      href="/works/[slug]"
      className={`col-span-2 rounded-lg bg-white overflow-hidden drop-shadow-sm hover:shadow-xl transition-shadow duration-200`}
    >
      <Image
        src={"/assets/works/" + slug + "/cover.jpg"}
        alt={`Cover Image for ${slug}`}
        className={"aspect-square w-full object-cover object-center"}
        width={1200}
        height={1200}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold leading-tight mb-3">{title}</h3>
        {tags && tags.map((tag) => <span className="inline-block rounded bg-slate-300 p-1 px-2 text-xs">{tag}</span>)}
      </div>
    </Link>
  );
};

export default WorkPreview;
