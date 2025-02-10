import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import PostHeaderToc from "./post-header-toc";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  modifiedDate?: string;
};

const PostHeader = ({ title, coverImage, date, modifiedDate }: Props) => {
  return (
    <div className="post-header relative flex items-center md:min-h-[500px] pt-12">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          className="block w-full h-full object-cover object-center"
          title={title}
          fill
        />
      </div>
      <div className="container max-w-(--breakpoint-lg) mx-auto flex flex-col h-full justify-center px-4 py-12">
        <PostTitle>{title}</PostTitle>
        <div className="flex justify-between relative">
          <DateFormatter dateString={date} modifiedDateString={modifiedDate} className="text-white" />
          <PostHeaderToc />
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
