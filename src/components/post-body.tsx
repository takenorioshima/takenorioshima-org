type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <article
      className="
        max-w-full prose
        prose-h2:font-semibold
        prose-p:leading-7
        before:prose-code:hidden after:prose-code:hidden
        js-toc-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostBody;
