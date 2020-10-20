import { formatTimestamp } from '~/utils/timeUtils';
import { Post } from '~/utils/blogUtils';
import { TagChip } from './TagChip';
import Link from 'next/link';

interface PostPreviewProps {
  post: Post;
  preview?: boolean;
}

export function PostPreview({ post, preview }: PostPreviewProps) {
  return (
    <div className="mb-10">
      <div className="opacity-75 text-sm">{formatTimestamp(post.timestamp)}</div>
      {preview ? (
        <a className="text-2xl">{post.title}</a>
      ) : (
        <Link href={`/blog/post/${post.slug}`}>
          <a className="text-2xl">{post.title}</a>
        </Link>
      )}
      <div className="flex flex-row">
        {post.tags.map((tag) => (
          <TagChip tag={tag} key={tag} />
        ))}
      </div>
      <div>{post.meta.description}</div>
    </div>
  );
}
