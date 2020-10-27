import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { formatDate } from "utils";

const postsDirectory = join(process.cwd(), "_posts");

function firstLines(file) {
  file.excerpt = file.content
    .split("\n")
    .slice(0, 2)
    .join(" ")
    .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
    .trim();
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, excerpt, content } = matter(fileContents, {
    excerpt: firstLines,
  });

  return {
    slug: realSlug,
    language: data.language,
    title: data.title,
    date: formatDate(new Date(data.date).toISOString()),
    excerpt,
    content,
  };
}

export function getAllPosts(locale = "pt-BR") {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"))
    .filter((post) => post.language === locale);
  return posts;
}
