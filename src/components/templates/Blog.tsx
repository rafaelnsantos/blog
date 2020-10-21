import { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { BlogProps } from '~/pages/blog/index';
import { CloudTag } from '~/utils/blogUtils';
import { PostList } from '../organisms/PostList';

const StyledTagClod = styled(TagCloud)`
  cursor: pointer;

  display: flex;

  flex-wrap: wrap;

  justify-content: center;
`;

export function BlogTemplate({ posts, tags, preview }: BlogProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });

  const postsToShow = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag as string))
    : posts;

  const clearTag = () => setSelectedTag(null);

  const selectTag = (tag: CloudTag) => setSelectedTag(tag.value);

  return (
    <div className="md:max-w-screen-xl m-auto">
      <div className="flex justify-center md:max-w-screen-md m-auto px-10">
        {selectedTag ? (
          <>
            <div>{selectedTag}</div>
            <button onClick={clearTag}>clear tag</button>
          </>
        ) : (
          <StyledTagClod
            colorOptions={{ luminosity: darkMode.value ? 'light' : 'dark' }}
            minSize={12}
            maxSize={24}
            tags={tags}
            onClick={selectTag}
          />
        )}
      </div>
      <PostList posts={postsToShow} preview={preview} />
    </div>
  );
}
