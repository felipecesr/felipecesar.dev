import { getBlogPosts } from './utils'
import CustomMDX from '@/components/mdx'

export async function generateStaticParams() {
  const posts = getBlogPosts()
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
const Post = async ({ params }) => {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return <CustomMDX source={post.content} />
}

export default Post
