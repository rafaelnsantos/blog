import { GetStaticProps } from 'next';
import { getTags, CloudTag, PostPreview, getPostsPreview } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { BlogTemplate } from '~/components/templates/Blog';

export interface BlogProps {
  posts: PostPreview[];
  tags: CloudTag[];

  preview?: boolean;
}

export default function BlogPage({ posts, tags }: BlogProps) {
  return (
    <Page title="Blog" description="Blog">
      <BlogTemplate posts={posts} tags={tags} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getPostsPreview();
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
    },
  };
};
