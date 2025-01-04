import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import Link from "next/link";
import "./global.css";
import Navigation from "@/components/navigation";
import SocialLink from "@/components/social-link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Wave from "@/components/wave";

const anton = Anton({
  variable: "--font-header",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felipe Cesar",
  description: "Um blog com artigos sobre boas práticas em engenharia de software focado em JavaScript, TypeScript e desenvolvimento web em geral.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-BR">
      <body className={`${anton.variable} ${workSans.variable} antialiased`}>
        <main className="container my-6 grid grid-cols-1 items-center gap-6 sm:my-10 sm:grid-cols-2 lg:grid-cols-3">
          <header>
            <h1 className={`whitespace-nowrap lg:order-1 ${anton.className}`}>
              <Link
                href="/"
                className="font-header text-6xl text-black decoration-primary-700 hover:underline dark:text-white"
              >
                Felipe Cesar
              </Link>
            </h1>
          </header>

          <div className="order-1 flex items-center justify-between gap-4 sm:order-none sm:justify-end lg:order-3">
            <SocialLink
              href="https://github.com/felipecesr"
              label="Github"
              Icon={FaGithub}
            />
            <SocialLink
              href="https://instagram.com/felipecesar.dev"
              label="Instagram"
              Icon={FaInstagram}
            />
            <SocialLink
              href="https://linkedin.com/in/felipecesr"
              label="Linkedin"
              Icon={FaLinkedin}
            />
          </div>

          <Navigation />

          <div className="my-6 sm:col-span-full lg:order-3">{children}</div>
        </main>
        <Wave />
      </body>
    </html>
  );
};

export default RootLayout;
