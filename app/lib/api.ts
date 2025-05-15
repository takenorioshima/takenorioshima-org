import fs from "fs";
import { join } from "path";
import { POSTS_PER_PAGE } from "./constants";
import { Post } from "./types";
import matter from "gray-matter";

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
const getAllPosts = async (): Promise<Post[]> => {
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
        coverImage: data.coverImage,
        tags: data.tags,
        content: content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
};

const getPostBySlug = async (slug: string): Promise<Post> => {
  const markdown = fs.readFileSync(`${postsDirectory}/${slug}.mdx`, "utf8");

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
