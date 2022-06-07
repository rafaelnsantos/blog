import { GetStaticProps } from 'next';
import { getTags, CloudTag, PostPreview, getPostsPreview } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { BlogTemplate } from '~/components/templates/Blog';
import { ReactElement } from 'react';
import { Seo } from '~/components/organisms/Seo';
export interface BlogProps {
  posts: PostPreview[];
  tags: CloudTag[];

  preview?: boolean;
}

export default function BlogPage({ posts, tags }: BlogProps) {
  return <BlogTemplate posts={posts} tags={tags} />;
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Page>
      <Seo title="Blog" description="Blog" />
      {page}
    </Page>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getPostsPreview();
  const tags = await getTags(posts, process.env.NODE_ENV === 'production');

  return {
    props: {
      posts,
      tags,
    },
  };
};
