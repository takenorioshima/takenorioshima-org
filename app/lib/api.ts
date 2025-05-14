import fs from "fs";
import { join } from "path";
import { POSTS_PER_PAGE } from "./constants";
import { Post } from "./types";
import matter from "gray-matter";

// Get all post data.
const getAllPosts = async (): Promise<Post[]> => {
  const postsDirectory = join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
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
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};

export { getAllPosts };
export type { Post };
