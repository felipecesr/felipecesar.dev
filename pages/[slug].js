import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'

import { getPostByFilename, getAllPaths } from '../lib/api'

import { Layout } from '../layout'
import { Bio } from '../components/Bio'
import PrismStyles from '../styles/prism'

const Post = ({ title, content }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  return (
    <Layout>
      <PrismStyles />
      <h1>{title}</h1>
      <ReactMarkdown source={content} />
      <hr />
      <Bio />
    </Layout>
  )
}

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
