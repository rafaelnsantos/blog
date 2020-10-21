import styled from 'styled-components';
import { PostPreview as PostPreviewType } from '~/utils/blogUtils';
import { PostPreview } from '../molecules/PostPreview';

interface PostListProps {
  posts: PostPreviewType[];
  preview?: boolean;
}

const StyledPostList = styled.div`
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  margin: auto;
`;

export function PostList({ posts, preview }: PostListProps) {
  return (
    <StyledPostList className="md:max-w-screen-xl">
      {posts.map((post, i) => (
        <PostPreview post={post} key={i} preview={preview} />
      ))}
    </StyledPostList>
  );
}
