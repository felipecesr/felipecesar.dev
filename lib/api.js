import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'posts')

export function getFilenames() {
  return fs.readdirSync(postsDirectory)
}

export function getPostByFilename(filename) {
  const slug = filename.replace(/\.md$/, '')
  const filePath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    date: new Date(data.date).toISOString(),
    content,
  }
}

export function getAllPosts() {
  const filenames = getFilenames()
  return filenames.map((filename) => getPostByFilename(filename))
}

export function getAllPaths() {
  return getAllPosts().map((post) => `/${post.slug}`)
}
