import Link from "next/link";
import { getBlogPosts } from "@/app/posts/[slug]/utils";
import formatDate from "@/lib/format-date";

const BlogPosts = ({ serie = null }) => {
  const allBlogs = getBlogPosts();

  return (
    <ul className="space-y-8 not-prose">
      {allBlogs
        .filter((post) =>
          !serie ? !post.metadata?.serie : post.metadata?.serie === serie
        )
        .map((post) => (
          <li key={post.slug} className="block">
            <Link
              href={`/posts/${post.slug}`}
              className="group grid grid-cols-[50px_1fr] gap-4 hover:bg-slate-100 bg-slate-50 dark:bg-slate-950 p-4 rounded dark:hover:bg-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide-icon lucide lucide-notebook-pen m-2"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path>
                <path d="M2 6h4"></path>
                <path d="M2 10h4"></path>
                <path d="M2 14h4"></path>
                <path d="M2 18h4"></path>
                <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
              </svg>
              <div>
                <h3 className="font-semibold sm:text-xl group-hover:underline decoration-primary-200 decoration-4 group-hover:decoration-primary-400">
                  {post.metadata.title}
                </h3>
                <time
                  dateTime={post.metadata.date}
                  className="text-primary-600 dark:text-primary-400"
                >
                  {formatDate(post.metadata.date)}
                </time>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default BlogPosts;
