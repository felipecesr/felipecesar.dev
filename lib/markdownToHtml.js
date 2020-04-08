import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
import html from 'rehype-stringify'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(html)
    .process(markdown)

  return result.toString()
}
