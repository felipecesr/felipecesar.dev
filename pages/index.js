import { getAllPosts } from '../lib/api'

import { Layout } from '../components/Layout'
import { PostCard } from '../components/PostCard'
import { SEO } from '../components/SEO'
import { siteMetadata } from '../lib/config'

const Blog = ({ posts }) => (
  <Layout>
    <SEO
      title={`Home | ${siteMetadata.title}`}
      desc={siteMetadata.description}
    />
    <div>
      {posts.map((post, index) => (
        <PostCard
          key={index}
          link={post.slug}
          text={post.title}
          excerpt={post.excerpt}
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
