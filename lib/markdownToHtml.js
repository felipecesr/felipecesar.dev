import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
import html from 'rehype-stringify'
import mdxPrism from 'mdx-prism'
import example from './example'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    // .use(rehypePrism)
    .use(mdxPrism)
    .use(example)
    .use(html)
    .process(markdown)

  return result.toString()
}
