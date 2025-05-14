export type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  coverImage: string | null;
  tags: string[] | null;
  content: string;
};

export interface CoverImage {
  title: string;
  slug: string;
}
