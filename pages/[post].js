import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const Post = ({ title, content }) => {
  return (
    <article>
      <h1>{title}</h1>
      <ReactMarkdown source={content} />
    </article>
  )
}

export async function getStaticPaths() {
  const contexts = require.context('../posts', true, /\.md$/)
  const allPosts = contexts.keys().map(path => {
    console.log(1, path)
    const fileName = path.match(/([^/]*)(?:\.([^.]+$))/)[1]
    return { params: fileName }
  })

  console.log(2, allPosts)

  return {
    paths: allPosts.map(post => `/${post.params}`) || [],
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { post } = context.params
  const contexts = require.context('../posts', true, /\.md$/)
  const content = contexts.keys().filter(path => {
    const fileName = path.match(/([^/]*)(?:\.([^.]+$))/)[1]
    return fileName === post
  })
  const matterData = matter(contexts(content[0]).default)
  delete matterData.orig
  if (matterData.data.date) {
    matterData.data.date = new Date(matterData.data.date).toISOString()
  }

  return { props: { content: matterData.content, ...matterData.data } }
}

export default Post
