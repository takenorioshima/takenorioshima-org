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
    const slug = path.replace(/\.mdx?$/, "");
    return slug;
  });
};

// Get all post data.
const getAllPosts = async (): Promise<Post[]> => {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .map((filename) => {
      const filePath = join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath);
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        coverImage: data.coverImage,
        tags: data.tags,
        content: content,
      };
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};

const getPostBySlug = async (slug: string): Promise<Post> => {
  const markdown = fs.readFileSync(`${postsDirectory}/${slug}.mdx`, "utf8");

  const { data, content } = matter(markdown);
  const post = {
    slug: slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    coverImage: data.coverImage,
    tags: data.tags,
    content: content,
  };
  return post;
};

export { getAllPostSlugs, getAllPosts, getPostBySlug };
export type { Post };
