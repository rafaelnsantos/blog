import { formatTimestamp } from '~/utils/timeUtils';
import { Post } from '~/utils/blogUtils';
import { TagChip } from './TagChip';

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <div className="mb-10">
      <div className="opacity-75 text-sm">{formatTimestamp(post.timestamp)}</div>
      <a className="text-2xl" href={`/blog/${post.slug}`}>
        {post.title}
      </a>
      <div className="flex flex-row">
        {post.tags.map((tag) => (
          <TagChip tag={tag} key={tag} />
        ))}
      </div>
      <div>{post.meta.description}</div>
    </div>
  );
}
