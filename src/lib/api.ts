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
    [key: string]: any;
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
  const numberOfPosts = 99;
  const slugs = getPostSlugs();
  const publishedSlugs = slugs.filter((slug) => {
    return slug.slice(0, 1) !== "+";
  });
  const posts = publishedSlugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, numberOfPosts);
  return posts;
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

export function generateSitemapXml() {
  const posts = getAllPosts(["slug", "title", "date", "modifiedDate"]);
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  posts.forEach((post) => {
    if (post.slug.slice(0, 1) !== "+") {
      xml += `
          <url>
            <loc>${url}/posts/${post.slug}/</loc>
            <lastmod>${post.modifiedDate || post.date}</lastmod>
            <changefreq>weekly</changefreq>
          </url>
        `;
    }
  });
  xml += `
    <url>
      <loc>${url}/lowpoly/</loc>
      <lastmod>2023-04-01</lastmod>
      <changefreq>weekly</changefreq>
    </url>`;
  xml += "</urlset>";
  fs.writeFileSync("public/sitemap.xml", xml);
  return null;
}
