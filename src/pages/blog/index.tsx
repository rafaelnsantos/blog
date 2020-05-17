import { GetStaticProps } from 'next';
import { getPosts, Post, getTags, CloudTag } from '~/utils/blogUtils';
import { formatTimestamp } from '~/utils/timeUtils';
import { TagCloud } from 'react-tagcloud';
import { useRouter } from 'next/router';

interface BlogProps {
  posts: Post[];
  tags: CloudTag[];
}

export default function Blog({ posts, tags }: BlogProps) {
  const router = useRouter();

  const renderTag = (tag: string) => <div key={tag}>{tag}</div>;

  const selectedTag = router.query.tag;

  const postsToShow = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag as string))
    : posts;

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

  const clearTag = () => router.push('/blog');

  return (
    <div>
      <div>
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={tags.filter((tag) => tag.value !== selectedTag)}
          onClick={(tag) => router.push(`/blog?tag=${tag.value}`)}
        />
        <div>{selectedTag}</div>
        <div>{selectedTag && <button onClick={clearTag}>clear tag</button>}</div>
      </div>
      <div>{postsToShow.map(renderPostPreview)}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const posts = await getPosts();
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
    },
  };
};
