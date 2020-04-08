import React from 'react'
import Head from 'next/head'
import { siteMetadata } from '../../lib/config'

const SEO = (props) => {
  const ogImage = `${siteMetadata.siteUrl}${
    props.image || siteMetadata.ogImage
  }`

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={props.title} />
      <meta
        name="og:description"
        property="og:description"
        content={props.desc}
      />
      <meta property="og:site_name" content="Proper Noun" />
      <meta property="og:url" content={`${props.canonical}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.desc} />
      <meta name="twitter:site" content={siteMetadata.author} />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      {props.canonical && <link rel="canonical" href={`${props.canonical}`} />}
    </Head>
  )
}

export { SEO }
