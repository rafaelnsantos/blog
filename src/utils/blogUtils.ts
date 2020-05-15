import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getPosts () {
  const dirname = path.join(process.cwd(), 'blog')

  let posts = []
  
  const files = fs.readdirSync(dirname)
  
  files.forEach(file => {
    const slug = file.replace(/.md/, '')
    const post = getPostBySlug(slug)
    posts.push(post)
  })
  
  return posts
}

export function getPostBySlug (slug) {
  const mdFile = require(`../../blog/${slug}.md`)

  const post = matter(mdFile.default)
  
  delete post.orig

  return { content: post.content, ...post.data, slug }
}