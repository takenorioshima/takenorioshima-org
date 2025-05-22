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
  const slugs = getWorkSlugs();
  const works = slugs
    .map((slug) => getWorkBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return works;
}

export function getAllWorks() {
  const slugs = getWorkSlugs();
  const works = slugs.map((slug) => getWorkBySlug(slug)).sort((a, b) => (a.date > b.date ? -1 : 1));
  return works;
}

type Items = {
  [key: string]: any;
};

export function getWorkBySlug(slug: string): Items {
  const fullPath = join(worksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return { slug, ...data };
}
