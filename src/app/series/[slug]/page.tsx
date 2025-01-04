import { getBlogPosts } from "@/lib/content";
import BlogPosts from "@/components/posts";

export async function generateStaticParams() {
  const posts = getBlogPosts("content/series");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Serie = async ({ params }) => {
  const { slug } = await params;
  const post = getBlogPosts("content/series").find(
    (post) => post.slug === slug
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.description}</p>
      <hr />
      <BlogPosts serie={slug} />
    </div>
  );
};

export default Serie;
