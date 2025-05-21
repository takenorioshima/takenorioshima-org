export type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  modifiedDate?: string;
  tags: string[] | null;
  content: string;
};
