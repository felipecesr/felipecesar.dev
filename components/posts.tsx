import Link from "next/link"
import { getBlogPosts } from "@/app/posts/[slug]/utils"

const BlogPosts = () => {
  const allBlogs = getBlogPosts()

  return (
    <ul>{allBlogs.map(post => <li key={post.slug}><Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link></li>)}</ul>
  )
}

export default BlogPosts
