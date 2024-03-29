import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostsCount, getPostsPreview, PostPreview } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import pagination from 'content/pagination.json';
import { BlogPageTemplate } from '~/components/templates/BlogPage';
import { ReactElement } from 'react';
import { Seo } from '~/components/organisms/Seo';

export interface BlogPageProps {
  posts: PostPreview[];
  pages: number;
  page: number;
  preview?: boolean;
}

const PAGE_SIZE = pagination.size;

export default function BlogPage({ posts, pages, page }: BlogPageProps) {
  return (
    <>
      <Seo title={`Blog page ${page}`} description="Blog" />
      <BlogPageTemplate page={page} pages={pages} posts={posts} />
    </>
  );
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <Page>{page}</Page>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsCount = await getPostsCount();

  const pages = Math.ceil(postsCount / PAGE_SIZE); // 5

  const paths = Array.from({ length: pages }, (_, i) => String(i + 1)); // ['1', '2', '3', '4', '5']

  return {
    paths: paths.map((path) => ({
      params: {
        id: path,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context) => {
  const page = parseInt(context.params?.id as string);

  const posts = await getPostsPreview({
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
