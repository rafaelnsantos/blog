import { GetStaticProps, GetStaticPaths } from 'next';
import { getPosts, getPostsCount, Post } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { PostList } from '~/components/blog/PostList';
import { BlogPagination } from '~/components/blog/BlogPagination';
import pagination from 'content/pagination.json';

interface BlogProps {
  posts: Post[];
  pages: number;
  page: number;
}

const PAGE_SIZE = pagination.size;

export default function BlogPage({ posts, pages, page }: BlogProps) {
  return (
    <Page title={`Blog page ${page}`} description="Blog" url={`/blog/page/${page}`}>
      <h1>Blog</h1>
      <PostList posts={posts} />
      <BlogPagination pages={pages} page={page} />
    </Page>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const postsCount = await getPostsCount();

  const pages = Math.ceil(postsCount / PAGE_SIZE); // 5

  const paths = Array.from({ length: pages }, (_, i) => String(i + 1));
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
