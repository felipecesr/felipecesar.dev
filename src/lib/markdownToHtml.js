import unified from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
const slug = require("remark-slug");
const headings = require("remark-autolink-headings");
import html from "rehype-stringify";
import mdxPrism from "mdx-prism";

export default async function markdownToHtml(markdown = "") {
  const result = await unified()
    .use(markdown)
    .use(slug)
    .use(headings)
    .use(remarkRehype)
    .use(mdxPrism)
    .use(html)
    .process(markdown);

  return result.toString();
}
