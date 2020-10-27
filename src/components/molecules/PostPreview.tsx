import { formatTimestamp } from '~/utils/timeUtils';
import { PostPreview as Post } from '~/utils/blogUtils';
import Link from 'next/link';
import { Image } from '../atoms/Image';
import { TagChip } from '../blog/TagChip';
import styled from 'styled-components';
import { Text } from '../atoms/Text';

interface PostPreviewProps {
  post: Post;
  preview?: boolean;
}

const Container = styled.div`
  background: var(--bg-inset);

  border-radius: 5px;

  box-shadow: 5px 5px 5px var(--shadow-bg-inset);
`;

const StyledLink = styled.a`
  color: var(--text-primary);

  cursor: pointer;

  transition: color 300ms;

  :hover {
    color: var(--text-link);
  }
`;

const StyledDescription = styled.div`
  max-width: 500px;
`;

export function PostPreview({ post, preview }: PostPreviewProps) {
  return (
    <Container className="flex flex-col m-3 p-3 h-full min-w-full sm:min-w-0">
      {preview ? (
        <>
          <StyledLink className="text-2xl">{post.title}</StyledLink>
          <Image
            src={post.meta.image}
            width="300"
            height="200"
            alt={post.title}
            className="self-center"
          />
        </>
      ) : (
        <>
          <Link href={`/blog/post/${post.slug}`} passHref>
            <StyledLink className="text-2xl">{post.title}</StyledLink>
          </Link>
          <Link href={`/blog/post/${post.slug}`} passHref>
            <StyledLink className="text-2xl">
              <Image
                src={post.meta.image}
                width="300"
                height="200"
                alt={post.title}
                className="self-center"
              />
            </StyledLink>
          </Link>
        </>
      )}
      <div className="opacity-75 justify-end">
        <Text align="right" size={0.7}>
          {formatTimestamp(post.timestamp)}
        </Text>
      </div>
      <div className="flex flex-row flex-wrap self-center">
        {post.tags.map((tag) => (
          <TagChip tag={tag} key={tag} />
        ))}
      </div>
      <StyledDescription>{post.meta.description}</StyledDescription>
    </Container>
  );
}
