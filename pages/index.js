import { getAllPosts } from '../lib/api'

import { Layout } from '../components/Layout'
import { Bio } from '../components/Bio'
import { PostCard } from '../components/PostCard'

const Blog = ({ posts }) => (
  <Layout>
    <Bio />
    <div>
      {posts.map((post, index) => (
        <PostCard
          key={index}
          link={post.slug}
          text={post.title}
          date={post.date}
        />
      ))}
    </div>
  </Layout>
)

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default Blog
