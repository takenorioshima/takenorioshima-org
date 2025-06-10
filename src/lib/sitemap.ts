import { getAllPosts } from "@/lib/post";
import { getAllWorks } from "@/lib/works";
import fs from "fs";

export function generateSitemapXml() {
  const posts = getAllPosts(["slug", "title", "date", "modifiedDate"]);
  const works = getAllWorks(["slug", "title", "date"]);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  xml += `
    <url>
      <loc>${url}</loc>
      <lastmod>${formattedDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>`;

  xml += `
    <url>
      <loc>${url}/posts/</loc>
      <lastmod>${formattedDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>`;
  posts.forEach((post) => {
    if (post.slug.slice(0, 1) !== "+") {
      xml += `
        <url>
          <loc>${url}/posts/${post.slug}/</loc>
          <lastmod>${post.modifiedDate || post.date}</lastmod>
          <changefreq>weekly</changefreq>
        </url>`;
    }
  });

  xml += `
    <url>
      <loc>${url}/works/</loc>
      <lastmod>${formattedDate}</lastmod>
      <changefreq>weekly</changefreq>
    </url>`;

  works.forEach((work) => {
    if (work.slug.slice(0, 1) !== "+") {
      const lastMod = work.date ? work.date : "";
      xml += `
        <url>
          <loc>${url}/works/${work.slug}/</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>weekly</changefreq>
        </url>`;
    }
  });

  xml += "</urlset>";
  fs.writeFileSync("public/sitemap.xml", xml);
  return null;
}
