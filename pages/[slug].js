import React from 'react'

import { getPostByFilename, getAllPaths } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

import { Layout } from '../components/Layout'
import { Date } from '../components/Date'
import { PostWrapper } from '../components/Post/styles'
import { SEO } from '../components/SEO'
import { Comments } from '../components/Comments'

const Post = ({ slug, title, date, excerpt, content }) => (
  <Layout>
    <SEO title={title} desc={excerpt} />
    <PostWrapper>
      <h1>{title}</h1>
      <Date dateString={date} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Comments url={slug} title={title} />
    </PostWrapper>
  </Layout>
)

export async function getStaticPaths() {
  const paths = getAllPaths()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  let { title, date, excerpt, content } = getPostByFilename(slug)
  content = await markdownToHtml(content || '')

  return { props: { slug, title, date, excerpt, content } }
}

export default Post
