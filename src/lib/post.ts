import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

type Items = {
  [key: string]: any;
};

const postsDirectory = join(process.cwd(), "src/data/posts");

export function getPostSlugs() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    return filename.replace(/\.md$/, "");
  });
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  let fileContents = "";
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (err) {
    console.log("Failed to read file:", fullPath);
  }

  const { data, content } = matter(fileContents);

  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") items[field] = realSlug;
    if (field === "content") items[field] = content;
    if (typeof data[field] !== "undefined") items[field] = data[field];
  });
  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug, fields)).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getRecentPosts(fields: string[] = []) {
  return getAllPosts(fields);
}

export function getTaggedPosts(tag: string) {
  const slugs = getPostSlugs();
  const fields = ["title", "date", "slug", "coverImage", "excerpt", "tags"];
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => {
      return post.tags.includes(tag);
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
