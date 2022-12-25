import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="post-header relative h-[500px]">
        <div className="absolute top-0 left-0 w-full -z-10">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className="block w-full h-[500px] object-cover object-center"
            title={title}
            width={1200}
            height={630}
          />
        </div>
        <div className="container mx-auto flex flex-col h-full justify-center px-4">
          <PostTitle>{title}</PostTitle>
          <div className="">
            <DateFormatter dateString={date} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
