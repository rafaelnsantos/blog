import { GetStaticProps } from 'next';
import { getPosts, Post, getTags, CloudTag } from '~/utils/blogUtils';
import { TagCloud } from 'react-tagcloud';
import { useRouter } from 'next/router';
import { PostList } from '~/components/blog/PostList';

interface BlogProps {
  posts: Post[];
  tags: CloudTag[];
}

export default function Blog({ posts, tags }: BlogProps) {
  const router = useRouter();

  const selectedTag = router.query.tag;

  const postsToShow = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag as string))
    : posts;

  const tagsToShow = tags.filter((tag) => tag.value !== selectedTag);

  const clearTag = () => router.push('/blog');

  const selectTag = (tag: CloudTag) => router.push(`/blog?tag=${tag.value}`);

  return (
    <div>
      <div>
        <TagCloud minSize={12} maxSize={35} tags={tagsToShow} onClick={selectTag} />
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
