import * as S from '../styles/utils'

import { getAllPosts } from '../lib/api'

import { Layout } from '../layout'
import { Bio } from '../components/Bio'

const Blog = ({ posts }) => (
  <Layout>
    <Bio />
    <div>
      {posts.map((post, index) => (
        <article key={index}>
          <S.PostTitle>
            <a href={post.slug}>{post.title}</a>
          </S.PostTitle>
        </article>
      ))}
    </div>
  </Layout>
)

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts
    }
  }
}

export default Blog
