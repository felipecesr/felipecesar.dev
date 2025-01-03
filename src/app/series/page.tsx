import { getBlogPosts } from "@/app/posts/[slug]/utils";

const Series = () => {
  const allSeries = getBlogPosts("content/series");

  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 not-prose">
      {allSeries.map((serie) => (
        <li
          key={serie.metadata.title}
          className="rounded-md shadow-md p-6 bg-slate-100 dark:bg-slate-800"
        >
          <a
            href={`/series/${serie.metadata.slug.toLowerCase()}`}
            className="group"
          >
            <h3
              className="mb-4 font-semibold decoration-primary-500 decoration-2 underline-offset-4 group-hover:underline dark:text-primary-50"
              id="h5o-4"
            >
              {serie.metadata.title}
            </h3>
            <p className="line-clamp-4">Entenda os 5 princípios do SOLID</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Series;
