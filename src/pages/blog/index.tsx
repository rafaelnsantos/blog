import { GetStaticProps } from 'next';
import { getPosts, Post } from '~/utils/blogUtils';
import { formatTimestamp } from '~/utils/timeUtils';

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  const renderTag = (tag: string) => <div key={tag}>{tag}</div>;

  const renderPostPreview = (post: Post) => (
    <div key={post.slug}>
      <h2>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </h2>
      <div>{formatTimestamp(post.timestamp)}</div>
      <div className="flex flex-row space-x-1">Tags:&nbsp;{post.tags.map(renderTag)}</div>
      <div>{post.meta.description}</div>
    </div>
  );

  return <div>{posts.map(renderPostPreview)}</div>;
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};
