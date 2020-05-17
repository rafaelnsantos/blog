import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getReadingTime } from './getReadingTime';

export interface Post {
  title: string;
  timestamp: number;
  meta: {
    title: string;
    description: string;
    image: string;
  };
  slug: string;
  content: string;
  readingTime: number;
  tags: string[];
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const mdFile = await import(`../../blog/${slug}.md`);

    const post = matter(mdFile.default);

    return {
      content: post.content,
      slug: slug,
      title: post.data.title,
      timestamp: new Date(post.data.date).getTime(),
      tags: post.data.tags,
      meta: {
        title: post.data.metaTitle,
        description: post.data.metaDescription,
        image: post.data.metaImage,
      },
      readingTime: getReadingTime(post.content),
    };
  } catch (err) {
    return null;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  const dirname = path.join(process.cwd(), 'blog');

  const files = fs.readdirSync(dirname);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/.md/, '');
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  return posts.sort((a, b) => b.timestamp - a.timestamp);
};
