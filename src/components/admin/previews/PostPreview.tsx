import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { useCallback } from 'react';
import { Post } from '~/components/blog/Post';
import { Post as PostType } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { Preview } from './Preview';

export function PostPreview({ entry }: PreviewTemplateComponentProps) {
  const get = useCallback((keys: string[]) => entry.getIn(['data', ...keys]), [entry]);

  const content = get(['body']);

  const post: PostType = {
    title: get(['title']),
    content,
    timestamp: get(['date']),
    meta: {
      description: get(['metaDescription']),
      image: get(['metaImage']),
      title: get(['metaTitle']),
    },
    readingTime: getReadingTime(content),
    slug: 'slug',
    star: get(['star']),
    tags: get(['tags']),
  };

  return (
    <Preview>
      <Post post={post} />
    </Preview>
  );
}
