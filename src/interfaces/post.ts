type PostType = {
  slug: string;
  title: string;
  date: string;
  modifiedDate?: string;
  coverImage: string;
  excerpt: string;
  tag: string[];
  content: string;
};

export default PostType;
