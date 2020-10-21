import { GetStaticProps } from 'next';
import { getTags, CloudTag, PostPreview, getPostsPreview } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { BlogTemplate } from '~/components/templates/Blog';
import { analytics } from '~/services/analytics';
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

  const { data } = await analytics({
    'start-date': '7daysAgo',
    'end-date': 'today',
    metrics: 'ga:uniqueEvents',
    dimensions: 'ga:eventAction',
  });

  return {
    props: {
      posts,
      tags: data.rows
        ? data.rows.reduce((prev, row) => {
            const tag = prev.find((t) => t.value === row[0]);
            if (tag) tag.count += parseInt(row[1]);

            return prev;
          }, tags)
        : tags,
    },
  };
};
