import { formatTimestamp } from '~/utils/timeUtils';
import { PostPreview as Post } from '~/utils/blogUtils';
import Link from 'next/link';
import { Image } from '../atoms/Image';
import { TagChip } from '../blog/TagChip';
import styled from 'styled-components';

interface PostPreviewProps {
  post: Post;
  preview?: boolean;
}

const Container = styled.div`
  flex: 1 0 300px;
`;

export function PostPreview({ post, preview }: PostPreviewProps) {
  return (
    <Container className="flex flex-col p-6 h-full ma">
      <div className="opacity-75 text-sm">{formatTimestamp(post.timestamp)}</div>
      {preview ? (
        <a className="text-2xl">{post.title}</a>
      ) : (
        <Link href={`/blog/post/${post.slug}`}>
          <a className="text-2xl">{post.title}</a>
        </Link>
      )}
      <Image src={post.meta.image} width="300" />
      <div className="flex flex-row flex-wrap">
        {post.tags.map((tag) => (
          <TagChip tag={tag} key={tag} />
        ))}
      </div>
      <div>{post.meta.description}</div>
    </Container>
  );
}
