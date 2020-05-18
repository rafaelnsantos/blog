import { PostPreview } from './PostPreview';
import { Post } from '~/utils/blogUtils';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="mt-10">
      {posts.map((post, i) => (
        <PostPreview post={post} key={i} />
      ))}
    </div>
  );
}
