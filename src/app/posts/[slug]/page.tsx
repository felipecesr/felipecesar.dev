import { getBlogPosts } from "@/lib/content";
import CustomMDX from "@/components/mdx";
import Date from "@/components/date";
import { baseUrl } from '@/app/sitemap'

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

const Post = async ({ params }) => {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="space-y-10">
        <hgroup className="space-y-2">
          <Date date={post.metadata.date} />
          <h1 className="text-2xl font-bold">{post.metadata.title}</h1>
        </hgroup>
        <article className="prose dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>
        {/* {#if data.meta.published && data.meta.modified}
          <p className="my-6 text-right text-sm text-slate-500 dark:text-gray-400">
            Last modified on <Date date={data.meta.modified} />.
          </p>
        {/if} */}
      </div>
      <footer className="my-10 rounded-md border-2 border-primary-200 bg-primary-100 px-8 py-4 dark:border-primary-900 dark:bg-primary-800">
        <p>
          Viu algo que parece um pouco estranho? Sinta-se à vontade para{" "}
          <a
            href={`https://github.com/felipecesr/felipecesar.dev/tree/main/content/posts/${slug}.md`}
            className="font-semibold underline decoration-primary-500 decoration-2 underline-offset-4"
          >
            abrir um pull request aqui
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default Post;
