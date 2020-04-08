import React from 'react'

import { getPostByFilename, getAllPaths } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

import { Layout } from '../components/Layout'
import { Bio } from '../components/Bio'
import { Date } from '../components/Date'
import { PostWrapper } from '../components/Post/styles'

const Post = ({ title, date, content }) => (
  <Layout>
    <PostWrapper>
      <h1>{title}</h1>
      <Date dateString={date} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <hr />
      <Bio />
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
  let { title, date, content } = getPostByFilename(slug)
  content = await markdownToHtml(content || '')

  return { props: { title, date, content } }
}

export default Post
