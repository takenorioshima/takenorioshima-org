import fs from "fs";
import { join } from "path";
import { POSTS_PER_PAGE } from "./constants";
import matter from "gray-matter";

type Props = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  modifiedDate?: string;
  tags: string[] | null;
  content: string;
};

const postsDirectory = join(process.cwd(), "posts");

// Get all post slugs.
const getAllPostSlugs = async (): Promise<string[]> => {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((path) => {
    const slug = path.replace(/\.md?$/, "");
    return slug;
  });
};

// Get all post data.
const getAllPosts = async (): Promise<Props[]> => {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((filename) => !/^\+.*\.md$/.test(filename))
    .map((filename) => {
      const filePath = join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath);
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        tags: data.tags,
        content: content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
};

const getPostBySlug = async (slug: string): Promise<Props> => {
  const markdown = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");

  const { data, content } = matter(markdown);
  return {
    slug: slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    tags: data.tags,
    content: content,
  };
};

export { getAllPostSlugs, getAllPosts, getPostBySlug };
export type { Post };
