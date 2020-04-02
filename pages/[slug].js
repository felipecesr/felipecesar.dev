import ReactMarkdown from 'react-markdown'

import { getPostByFilename, getAllPaths } from '../lib/api'

import { Layout } from '../layout'
import { Bio } from '../components/Bio'

const Post = ({ title, content }) => (
  <Layout>
    <h1>{title}</h1>
    <ReactMarkdown source={content} />
    <hr />
    <Bio />
  </Layout>
)

export async function getStaticPaths() {
  const paths = getAllPaths()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const { title, content } = getPostByFilename(slug)

  return { props: { title, content } }
}

export default Post
