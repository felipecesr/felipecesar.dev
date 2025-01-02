import Biography from "@/biography.mdx";

const Home = () => (
  <section className="space-y-8">
    <picture>
      <source
        sizes="(min-width: 640px) 768px, 736px"
        type="image/avif"
        srcSet="/img/felipe_736.avif 736w, /img/felipe_768.avif 768w"
      />
      <source
        sizes="(min-width: 640px) 768px, 736px"
        type="image/webp"
        srcSet="/img/felipe_736.webp 736w, /img/felipe_768.webp 768w"
      />
      <source
        sizes="(min-width: 640px) 768px, 736px"
        type="image/jpeg"
        srcSet="/img/felipe_736.jpeg 736w, /img/felipe_768.jpeg 768w"
      />
      <img
        className="aspect-[3/4] max-w-full rounded-md shadow-lg sm:float-right sm:ml-8 sm:w-72 md:w-96"
        alt="Felipe Cesar"
        width="768"
        height="1024"
        src="/img/felipe_768.jpeg"
      />
    </picture>
    <Biography />
  </section>
);

export default Home;
