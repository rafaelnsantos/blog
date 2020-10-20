import { formatTimestamp } from '~/utils/timeUtils';
import { PostPreview as Post } from '~/utils/blogUtils';
import { TagChip } from './TagChip';
import Link from 'next/link';
import { Image } from '../atoms/Image';

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
      <Image src={post.meta.image} width="300" />
      <div className="flex flex-row">
        {post.tags.map((tag) => (
          <TagChip tag={tag} key={tag} />
        ))}
      </div>
      <div>{post.meta.description}</div>
    </div>
  );
}
