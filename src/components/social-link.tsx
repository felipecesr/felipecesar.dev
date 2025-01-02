import Link from "next/link";

type Props = {
  href: string;
  Icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
};

const SocialLink = ({ href, label, Icon }: Props) => (
  <Link
    href={href}
    target="_blank"
    title={label}
    className="order-1 flex items-center justify-between gap-4 sm:order-none sm:justify-end lg:order-3"
  >
    <Icon
      className="transition-colors hover:stroke-primary-700 active:stroke-primary-600"
      aria-label={label}
      size={36}
    ></Icon>
  </Link>
);

export default SocialLink;
