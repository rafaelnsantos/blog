import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { Post as PostType } from '~/utils/blogUtils';
import { Post } from '../blog/Post';
import { Preview } from '../Preview';

export function PostPreview({ entry }: PreviewTemplateComponentProps) {
  const post: PostType = {
    title: entry.getIn(['data', 'title']),
    content: entry.getIn(['data', 'body']),
    timestamp: new Date().getTime(),
    meta: {
      description: entry.getIn(['data', 'metaDescription']),
      image: entry.getIn(['data', 'metaImage']),
      title: entry.getIn(['data', 'metaTitle']),
    },
    readingTime: 1,
    slug: 'slug',
    star: entry.getIn(['data', 'star']),
    tags: entry.getIn(['data', 'tags']),
  };

  return (
    <Preview>
      <Post post={post} />
    </Preview>
  );
}
