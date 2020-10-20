import { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import { BlogProps } from '~/pages/blog/index';
import { CloudTag } from '~/utils/blogUtils';
import { Text } from '../atoms/Text';
import { PostList } from '../blog/PostList';

export function BlogTemplate({ posts, tags, preview }: BlogProps) {
  console.log(posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const postsToShow = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag as string))
    : posts;

  const clearTag = () => setSelectedTag(null);

  const selectTag = (tag: CloudTag) => setSelectedTag(tag.value);

  return (
    <>
      <Text variant="h1">Blog</Text>
      <div className="h-10">
        <TagCloud minSize={12} maxSize={24} tags={tags} onClick={selectTag} />
        <div>{selectedTag}</div>
        <div>{selectedTag && <button onClick={clearTag}>clear tag</button>}</div>
      </div>
      <PostList posts={postsToShow} preview={preview} />
    </>
  );
}
