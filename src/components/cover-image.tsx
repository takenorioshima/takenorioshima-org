import cn from "classnames";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full aspect-[2/1] object-cover object-center")}
      width={1280}
      height={640}
    />
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
