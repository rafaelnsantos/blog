import { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import { GetStaticProps } from 'next';
import { getPosts, Post, getTags, CloudTag } from '~/utils/blogUtils';
import { PostList } from '~/components/blog/PostList';
import { Page } from '~/components/Page';

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
    <Page>
      <div className="h-10">
        <TagCloud minSize={12} maxSize={24} tags={tags} onClick={selectTag} />
        <div>{selectedTag}</div>
        <div>{selectedTag && <button onClick={clearTag}>clear tag</button>}</div>
      </div>
      <PostList posts={postsToShow} />
    </Page>
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
