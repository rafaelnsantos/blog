import { GetStaticProps, GetStaticPaths } from 'next';
import { getPosts, getPostsCount, Post } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { PostList } from '~/components/blog/PostList';
import { BlogPagination } from '~/components/blog/BlogPagination';

interface BlogProps {
  posts: Post[];
  pages: number;
  page: number;
}

const PAGE_SIZE = 2;

export default function BlogPage({ posts, pages, page }: BlogProps) {
  return (
    <Page title={`Blog page ${page}`} description="Blog">
      <h1>Blog</h1>
      <PostList posts={posts} />
      <BlogPagination pages={pages} page={page} />
    </Page>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const postsCount = await getPostsCount();

  const pages = Math.ceil(postsCount / PAGE_SIZE); // 5

  const paths: string[] = [];

  for (let i = 1; i <= pages; i++) {
    paths.push(String(i));
  }

  return {
    paths: paths.map((path) => ({
      params: {
        id: path,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
  const page = parseInt(context.params.id as string);

  const posts = await getPosts({
    page: {
      page,
      size: PAGE_SIZE,
    },
  });

  const pages = Math.ceil((await getPostsCount()) / PAGE_SIZE);

  return {
    props: {
      posts,
      pages,
      page,
    },
  };
};
