import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src/data/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getRecentPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const publishedSlugs = slugs.filter((slug)=>{
    return ( slug.slice(0, 1) !== '+' );
  })
  const posts = publishedSlugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

const worksDirectory = join(process.cwd(), "src/data/works");

export function getWorkSlugs() {
  return fs.readdirSync(worksDirectory);
}

export function getWorkBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(worksDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  type Items = {
    [key: string]: string;
  };

  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllWorks(fields: string[] = []) {
  const slugs = getWorkSlugs();
  const works = slugs
    .map((slug) => getWorkBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return works;
}
