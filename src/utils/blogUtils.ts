import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getReadingTime } from './getReadingTime';
import { analytics } from '~/services/analytics';

export interface Post {
  title: string;
  date: number;
  meta: {
    title: string;
    description: string;
    image: string;
  };
  slug: string;
  body: string;
  readingTime: number;
  tags: string[];
  published: boolean;
  authors: string[];
}

export type PostPreview = Omit<Post, 'body' | 'readingTime' | 'published' | 'authors'>;

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const mdFile = await import(`../../blog/${slug}.md`);

  const post = matter(mdFile.default);

  return {
    body: post.content,
    slug: slug,
    title: post.data.title,
    date: new Date(post.data.date).getTime(),
    tags: post.data.tags.map((tag: string) => tag.toLowerCase()),
    meta: {
      title: post.data.meta.title,
      description: post.data.meta.description,
      image: post.data.meta.image,
    },
    readingTime: getReadingTime(post.content),
    published: post.data.published,
    authors: post.data.authors,
  };
};

interface GetPostsConfig {
  page?: {
    page: number;
    size: number;
  };
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

  return posts.sort((a, b) => b.date - a.date).filter((post) => post.published);
};

export const getPosts = async (options?: GetPostsConfig): Promise<Post[]> => {
  let posts = await getAllPosts();

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
    date: post.date,
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

async function withAnalytics(tags: CloudTag[]) {
  try {
    const { data } = await analytics({
      'start-date': '2020-10-01',
      'end-date': 'today',
      metrics: 'ga:uniqueEvents',
      dimensions: 'ga:eventAction',
    });

    return data.rows
      ? data.rows.reduce((prev, row) => {
          const tag = prev.find((t) => t.value === row[0].toLowerCase());

          if (tag) tag.count += parseInt(row[1]);

          return prev;
        }, tags)
      : tags;
  } catch (err) {
    console.log(err);
    return tags;
  }
}

export const getTags = async (posts: PostPreview[], analytics = false): Promise<CloudTag[]> => {
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

  if (analytics) {
    return withAnalytics(tags);
  }

  return tags;
};
