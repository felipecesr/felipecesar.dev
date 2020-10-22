import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import slug from "remark-slug";
import headings from "remark-autolink-headings";
import html from "rehype-stringify";
import mdxPrism from "mdx-prism";

export default async function markdownToHtml(markdown = "") {
  const result = await unified()
    .use(remarkParse)
    .use(slug)
    .use(headings, { behavior: "append" })
    .use(remarkRehype)
    .use(mdxPrism)
    .use(html)
    .process(markdown);

  return result.toString();
}
