import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  };

  const postsUrl = allPosts.map((data) => {
    return {
      url: baseUrl + "posts/" + data.slug,
      lastModified: data.modifiedDate ? data.modifiedDate : data.date,
      changeFrequency: "weekly" as const,
    };
  });
  return [homeUrl, ...postsUrl];
}
