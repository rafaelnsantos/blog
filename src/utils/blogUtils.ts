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

export interface PostPreview {
  title: string;
  timestamp: number;
  slug: string;
  meta: {
    title: string;
    description: string;
    image: string;
  };
  tags: string[];
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const mdFile = await import(`../../blog/${slug}.md`);

  const post = matter(mdFile.default);

  return {
    content: post.content,
    slug: slug,
    title: post.data.title,
    timestamp: new Date(post.data.date).getTime(),
    tags: post.data.tags.map((tag: string) => tag.toLowerCase()),
    meta: {
      title: post.data.metaTitle,
      description: post.data.metaDescription,
      image: post.data.metaImage,
    },
    readingTime: getReadingTime(post.content),
    star: post.data.star,
  };
};

interface GetPostsConfig {
  page?: {
    page: number;
    size: number;
  };
  starred?: boolean;
}

const getPostsFiles = () => {
  const dirname = path.join(process.cwd(), 'blog');

  const files = fs.readdirSync(dirname);

  return files;
};

const getAllPosts = async (): Promise<Post[]> => {
  const files = getPostsFiles();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/.md/, '');
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  return posts.sort((a, b) => b.timestamp - a.timestamp);
};

export const getPosts = async (options?: GetPostsConfig): Promise<Post[]> => {
  let posts = await getAllPosts();

  if (options?.starred) {
    posts = posts.filter((post) => post.star);
  }

  if (options?.page) {
    const { page, size } = options.page;
    posts = posts.slice((page - 1) * size, page * size);
  }

  return posts;
};

export const getPostsPreview = async (options?: GetPostsConfig): Promise<PostPreview[]> => {
  const posts = await getPosts(options);

  return posts.map((post) => ({
    meta: post.meta,
    slug: post.slug,
    tags: post.tags,
    timestamp: post.timestamp,
    title: post.title,
  }));
};

export const getPostsCount = async (): Promise<number> => {
  const files = getPostsFiles();

  return files.length;
};

export interface CloudTag {
  value: string;
  count: number;
}

export const getTags = (posts: PostPreview[]): CloudTag[] => {
  const tags: CloudTag[] = [];

  posts.map((post) => {
    post.tags.map((tag) => {
      const found = tags.findIndex((t) => t.value === tag);
      if (found !== -1) {
        tags[found].count += 1;
      } else {
        tags.push({ value: tag.toLocaleLowerCase(), count: 1 });
      }
    });
  });

  return tags;
};
