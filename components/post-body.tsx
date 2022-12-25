type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <article
      className="prose prose-sm md:prose-base max-w-full px-4 js-toc-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostBody;
