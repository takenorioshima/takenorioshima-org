import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  tags: string;
  coverImage: string;
  date: string;
  excerpt: string;
  index: number;
};

const Card = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  index,
  tags,
}: Props) => {
  const tagList = tags.split(",");
  return (
    <div className="col-span-1">
      <Image src={coverImage} width="1000" height="1000" alt={title} />
      <h3>{title}</h3>
      {tagList.map((tag, i) => {
        return (
          <>
            <span>{tagList[i]} </span>
          </>
        );
      })}
    </div>
  );
};
export default Card;
