import { PostPreview } from './PostPreview';
import { Post } from '~/utils/blogUtils';

interface PostListProps {
  posts: Post[];
  preview?: boolean;
}

export function PostList({ posts, preview }: PostListProps) {
  return (
    <div className="mt-10">
      {posts.map((post, i) => (
        <PostPreview post={post} key={i} preview={preview} />
      ))}
    </div>
  );
}
