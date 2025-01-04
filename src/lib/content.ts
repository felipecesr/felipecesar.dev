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
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
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
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

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
