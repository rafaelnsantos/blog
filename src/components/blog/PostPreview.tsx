import { formatTimestamp } from '~/utils/timeUtils';
import { Post } from '~/utils/blogUtils';
import { TagChip } from './TagChip';
import Link from 'next/link';

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <div className="mb-10">
      <div className="opacity-75 text-sm">{formatTimestamp(post.timestamp)}</div>
      <a href={`/blog/${post.slug}`} className="text-2xl">
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
