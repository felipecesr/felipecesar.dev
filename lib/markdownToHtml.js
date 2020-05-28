import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import html from 'rehype-stringify'
import mdxPrism from 'mdx-prism'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(mdxPrism)
    .use(html)
    .process(markdown)

  return result.toString()
}
