import { getBlogPosts } from "@/lib/content";

export const baseUrl = "https://felipecesar.dev";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const series = getBlogPosts("content/series").map((serie) => ({
    url: `${baseUrl}/series/${serie.slug}`,
    lastModified: serie.metadata.publishedAt,
  }));

  const routes = ["", "/posts", "/series"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...series];
}
