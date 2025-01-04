import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  serie?: string;
  date?: string;
  description?: string;
  slug?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => /\.(md|mdx)$/.test(file));
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    let c = content;
    const regex = /`{3}mermaid\n([\S\s]*?)`{3}/g;
    const mermaid = content.matchAll(regex);
    [...mermaid].forEach((m) => {
      c = c.replace(m[0], `<Svg data={\`${m[1]}\`} />`);
    });

    return {
      metadata,
      slug,
      content: c,
    };
  }).sort((obj1, obj2) => new Date(obj2.metadata.date).getTime() - new Date(obj1.metadata.date).getTime());
}

export function getBlogPosts(dir = "content/posts") {
  return getMDXData(path.join(process.cwd(), dir));
}
