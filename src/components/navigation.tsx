import Link from "next/link";

const navItems = {
  "/blog": {
    name: "Blog",
  },
  "/series": {
    name: "Séries",
  },
};

const Nav = () => (
  <nav className="flex items-center gap-4 sm:col-start-2 sm:justify-end lg:order-2 lg:justify-center">
    {Object.entries(navItems).map(([path, { name }]) => (
      <Link key={path} href={path}>
        {name}
      </Link>
    ))}
  </nav>
);

export default Nav;
