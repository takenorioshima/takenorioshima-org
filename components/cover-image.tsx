import Image from "next-export-optimize-images/image";

type Props = {
  title: string;
  slug?: string;
};

const CoverImage = ({ title, slug }: Props) => {
  const image = (
    <Image
      src={"assets/posts/" + slug + "/cover.jpg"}
      alt={`Cover Image for ${title}`}
      className={"w-full aspect-2/1 object-cover object-center"}
      width={1280}
      height={640}
    />
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
