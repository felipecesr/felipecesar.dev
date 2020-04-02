import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Blog = ({ posts }) => (
  <article>
    <h1>Felipe César</h1>
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <a href={post.slug}>{post.title}</a>
        </li>
      ))}
    </ul>
  </article>
)

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      content
    }
  })

  return {
    props: {
      posts
    }
  }
}

export default Blog
