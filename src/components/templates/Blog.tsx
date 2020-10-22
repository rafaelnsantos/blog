import { useState } from 'react';
import { BlogProps } from '~/pages/blog/index';
import { CloudTags } from '../organisms/CloudTags';
import { PostList } from '../organisms/PostList';

export function BlogTemplate({ posts, tags, preview }: BlogProps) {
  const [postsToShow, setPostsToShow] = useState(posts);

  return (
    <div className="m-auto">
      <CloudTags
        onSelectTag={(tag) =>
          setPostsToShow(tag ? posts.filter((post) => post.tags.includes(tag)) : posts)
        }
        tags={tags}
      />
      <PostList posts={postsToShow} preview={preview} />
    </div>
  );
}
