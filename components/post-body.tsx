type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <article
      className="prose prose-sm md:prose-base max-w-full px-4"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostBody;
