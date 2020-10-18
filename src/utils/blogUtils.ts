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
  star: boolean;
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
      star: post.data.star,
    };
  } catch (err) {
    return null;
  }
};

interface GetPostsConfig {
  page: number;
  size: number;
}

export const getPosts = async (options?: GetPostsConfig): Promise<Post[]> => {
  const dirname = path.join(process.cwd(), 'blog');

  const files = fs.readdirSync(dirname);

  const posts = await Promise.all(
    options
      ? files
          .slice((options.page - 1) * options.size, options.page * options.size)
          .map(async (file) => {
            const slug = file.replace(/.md/, '');
            const post = await getPostBySlug(slug);
            return post;
          })
      : files.map(async (file) => {
          const slug = file.replace(/.md/, '');
          const post = await getPostBySlug(slug);
          return post;
        })
  );

  return options
    ? posts.sort((a, b) => b.timestamp - a.timestamp)
    : posts.filter((post) => post.star).sort((a, b) => b.timestamp - a.timestamp);
};

export const getPostsCount = async (): Promise<number> => {
  const dirname = path.join(process.cwd(), 'blog');

  const files = fs.readdirSync(dirname);

  return files.length;
};

export interface CloudTag {
  value: string;
  count: number;
}

export const getTags = (posts: Post[]): CloudTag[] => {
  const tags: CloudTag[] = [];

  posts.map((post) => {
    post.tags.map((tag) => {
      const found = tags.findIndex((t) => t.value === tag);
      if (found !== -1) {
        tags[found].count += 1;
      } else {
        tags.push({ value: tag, count: 1 });
      }
    });
  });

  return tags;
};
