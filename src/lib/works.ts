import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Work from "../interfaces/work";

const worksDirectory = join(process.cwd(), "src/data/works");

export function getWorkSlugs() {
  const filenames = fs.readdirSync(worksDirectory);
  return filenames.map((filename) => {
    return filename.replace(/\.md$/, "");
  });
}

export function getRecentWorks(fields: string[] = []) {
  return getAllWorks(fields).slice(0, 6);
}

export function getAllWorks(fields: string[] = []) {
  const slugs = getWorkSlugs();
  return slugs
    .map((slug) => getWorkBySlug(slug, fields))
    .sort((a, b) => {
      const dateA = new Date(a.date || "1970-01-01").getTime();
      const dateB = new Date(b.date || "1970-01-01").getTime();
      return dateB - dateA;
    });
}

type Items = {
  [key: string]: any;
};

export function getWorkBySlug(slug: string, fields: string[]): Items {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(worksDirectory, `${realSlug}.md`);

  let fileContents = "";
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (err) {
    console.log("Failed to read file:", fullPath);
  }

  const { data } = matter(fileContents);

  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") items[field] = realSlug;
    if (typeof data[field] !== "undefined") items[field] = data[field];
  });
  return items;
}
