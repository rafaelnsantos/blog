import { GetStaticProps } from 'next';
import { getPosts, Post, getTags, CloudTag } from '~/utils/blogUtils';
import { PostList } from '~/components/blog/PostList';
import { useState } from 'react';
import { WorldCloud } from '~/components/blog/WordCloud';

interface BlogProps {
  posts: Post[];
  tags: CloudTag[];
}

export default function Blog({ posts, tags }: BlogProps) {
  const [selectedTag, setSelectedTag] = useState<string>(null);

  const postsToShow = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag as string))
    : posts;

  const clearTag = () => setSelectedTag(null);

  const selectTag = (tag: CloudTag) => setSelectedTag(tag.value);

  return (
    <div>
      <div>
        <WorldCloud tags={tags} onSelectTag={selectTag} />
        <div>{selectedTag}</div>
        <div>{selectedTag && <button onClick={clearTag}>clear tag</button>}</div>
      </div>
      <PostList posts={postsToShow} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getPosts();
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
    },
  };
};
