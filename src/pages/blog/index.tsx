import { GetStaticProps } from 'next';
import { getPosts, Post, getTags, CloudTag } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { BlogTemplate } from '~/components/templates/Blog';

export interface BlogProps {
  posts: Post[];
  tags: CloudTag[];

  preview?: boolean;
}

export default function BlogPage({ posts, tags }: BlogProps) {
  return (
    <Page title="Blog" description="Blog" url="/blog">
      <BlogTemplate posts={posts} tags={tags} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getPosts({
    starred: true,
  });
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
    },
  };
};
